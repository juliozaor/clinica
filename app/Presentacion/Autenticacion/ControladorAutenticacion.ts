import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioAutenticacion } from 'App/Dominio/Datos/Servicios/ServicioAutenticacion'
import { EnviadorEmailAdonis } from 'App/Infraestructura/Email/EnviadorEmailAdonis'
import { EncriptadorAdonis } from 'App/Infraestructura/Encriptacion/EncriptadorAdonis'
import { RepositorioAutorizacionDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioAutorizacionDB'
import { RepositorioBloqueoUsuarioDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioBloqueoUsuarioDB'
import { RepositorioUsuariosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioUsuariosDB'
import ActiveDirectoryService from 'App/Infraestructura/Servicios/ActiveDirectoryService'

export default class ControladorArchivoVariable {
  private service: ServicioAutenticacion
  private activeDirectoryService = new ActiveDirectoryService();
  constructor () {
    this.service = new ServicioAutenticacion(
      new EncriptadorAdonis(),
      new EnviadorEmailAdonis(),
      new RepositorioBloqueoUsuarioDB(),
      new RepositorioAutorizacionDB(),
      new RepositorioUsuariosDB()
    )
  }

  public async inicioSesion ({ request, response }:HttpContextContract) {
    const peticion = request.all()
    const usuario = peticion['usuario']
    const contrasena = peticion['contrasena']
    let isAuthenticated = true;
    try {
      // Autenticar al usuario en Active Directory
      // isAuthenticated = await this.activeDirectoryService.authenticate(usuario, contrasena);
      
    } catch (error) {
      // Manejar errores      
      console.error('Error al autenticar al usuario:', error);
      return response.status(500).send(error);
    }
      if (isAuthenticated) {
        const datos = await this.service.iniciarSesion(usuario, contrasena)       
        
        return datos;
      } else {
        // Las credenciales proporcionadas no son válidas
        return response.status(400).send('Credenciales inválidas');
      }
    



    
  }

/*   public async inicioSesion ({ request, response }:HttpContextContract) {
    const peticion = request.all()
    const usuario = peticion['usuario']
    const contrasena = peticion['contrasena']
    response.status(200).send({
      token: ServicioAutenticacionJWT.generarToken(usuario, contrasena),
    })
  } */

  public async cambiarClave({request, response}:HttpContextContract){
    const peticion = await request.body()
    const identificacion = peticion.identificacion
    const clave = peticion.clave
    const nuevaClave = peticion.nuevaClave

    await this.service.cambiarClave(identificacion, clave, nuevaClave)
    response.status(200).send({
      mensaje: 'Su contraseña ha sido cambiada exitosamente',
      estado: 200
    })
  }
}
