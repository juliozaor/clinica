/* eslint-disable max-len */
import { GeneradorContrasena } from "App/Dominio/GenerarContrasena/GenerarContrasena";
import { ServicioUsuarios } from "./ServicioUsuarios";
import { ServicioAutenticacionJWT } from "App/Dominio/Datos/Servicios/ServicioJWT";
import { Exception } from "@adonisjs/core/build/standalone";
import { RespuestaInicioSesion } from "App/Dominio/Dto/RespuestaInicioSesion";
import { Usuario } from "../Entidades/Usuario";
import { Encriptador } from "App/Dominio/Encriptacion/Encriptador";
import { RepositorioBloqueoUsuario } from "App/Dominio/Repositorios/RepositorioBloqueoUsuario";
import { RegistroBloqueo } from "../Entidades/Usuarios/RegistroBloqueo";
import { v4 as uuid } from "uuid";
import { RepositorioAutorizacion } from "App/Dominio/Repositorios/RepositorioAutorizacion";
import { RepositorioUsuario } from "App/Dominio/Repositorios/RepositorioUsuario";
import { EnviadorEmail } from "App/Dominio/Email/EnviadorEmail";
import { RolDto } from "App/Presentacion/Autenticacion/Dtos/RolDto";
import ActiveDirectoryService from "App/Infraestructura/Servicios/ActiveDirectoryService";
import { ServicioLogs } from "./ServicioLogs";
import Env from "@ioc:Adonis/Core/Env";

export class ServicioAutenticacion {
  private servicioUsuario: ServicioUsuarios;
  private activeDirectoryService = new ActiveDirectoryService();
  private servicioLogs = new ServicioLogs();
  constructor(
    private encriptador: Encriptador,
    private enviadorEmail: EnviadorEmail,
    private repositorioBloqueo: RepositorioBloqueoUsuario,
    private repositorioAutorizacion: RepositorioAutorizacion,
    private repositorioUsuario: RepositorioUsuario
  ) {
    this.servicioUsuario = new ServicioUsuarios(
      this.repositorioUsuario,
      new GeneradorContrasena(),
      this.encriptador,
      this.enviadorEmail
    );
  }

  public async cambiarClave(
    identificacion: string,
    clave: string,
    nuevaClave: string
  ) {
    const usuario = await this.verificarUsuario(identificacion);
    if (usuario instanceof Usuario) {
      if (!(await this.encriptador.comparar(clave, usuario.clave))) {
        throw new Exception("Credenciales incorrectas", 400);
      }
      usuario.clave = nuevaClave;
      usuario.claveTemporal = false;
      this.servicioUsuario.actualizarUsuario(usuario.id, usuario);
      return;
    }
    throw new Exception("Credenciales incorrectas", 400);
  }

  public async iniciarSesion(
    usuario: string,
    contrasena: string
  ): Promise<RespuestaInicioSesion> {
    const usuarioVerificado = await this.verificarUsuario(usuario);
    
    if (!usuarioVerificado) {
      this.servicioLogs.Login(
        usuario,
        "fallido",
        "Usuario no registrado en el sistema"
      );
      throw new Exception(
        "Usuario no registrado en el sistema, valide el acceso con el administrador",
        400
      );
    }

    

    let isAuthenticated = false;
    try {
      // Autenticar al usuario en Active Directory
      if (Env.get("DIRACT") == 1) {
        const autenticado = await this.activeDirectoryService.authenticate(usuario, contrasena);
               
        if(autenticado) isAuthenticated = true;
      } else if ((await this.encriptador.comparar(contrasena, usuarioVerificado.clave))) {
        isAuthenticated = true;
      }
    } catch (error) {      
     //this.servicioLogs.Login(usuario, "fallido", error.lde_message);
      throw new Exception(error.lde_message, 400);
    }

    if (!isAuthenticated) {
      this.servicioLogs.Login(usuario, "fallido", "Credenciales incorrectas");
      throw new Exception("Credenciales incorrectas", 400);
    }
 
    const rolUsuario = await this.repositorioAutorizacion.obtenerRolConModulosYPermisos(usuarioVerificado.idRol);
    const token = ServicioAutenticacionJWT.generarToken({
      documento: usuarioVerificado.identificacion,
      idRol: usuarioVerificado.idRol,
    });

    this.servicioLogs.Login(usuario, "exitoso", "");

    return new RespuestaInicioSesion(
      {
        id: usuarioVerificado.id,
        usuario: usuarioVerificado.identificacion,
        nombre: usuarioVerificado.nombre,
        apellido: usuarioVerificado.apellido,
        telefono: usuarioVerificado.telefono,
        correo: usuarioVerificado.correo,
      },
      token,
      new RolDto(rolUsuario),
      usuarioVerificado.claveTemporal
    );
  }

  public async verificarUsuario(usuario: string): Promise<Usuario> {
    const usuarioDB = await this.servicioUsuario.obtenerUsuarioPorUsuario(
      usuario
    );
    if (!usuarioDB) {
      throw new Exception("Credenciales incorrectas!", 400);
    }
    return usuarioDB;
  }

  private async crearRegistroDeBloqueo(
    identificacion: string
  ): Promise<RegistroBloqueo> {
    const registro = new RegistroBloqueo(uuid(), identificacion, 0, false);
    return await this.repositorioBloqueo.crearRegistro(registro);
  }

  private async manejarIntentoFallido(
    registro: RegistroBloqueo
  ): Promise<RegistroBloqueo> {
    registro.agregarIntentoFallido();
    return await this.repositorioBloqueo.actualizarRegistro(registro);
  }
}
