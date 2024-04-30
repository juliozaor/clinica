
import { Paginador } from 'App/Dominio/Paginador';
import { MapeadorPaginacionDB } from './MapeadorPaginacionDB';
import { RepositorioUsuario } from 'App/Dominio/Repositorios/RepositorioUsuario';
import { Usuario } from 'App/Dominio/Datos/Entidades/Usuario';
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario';

import { PayloadJWT } from '../../../Dominio/Dto/PayloadJWT';
export class RepositorioUsuariosDB implements RepositorioUsuario {
  async obtenerUsuarios (params: any): Promise<{usuarios: Usuario[], paginacion: Paginador}> {
    const usuarios: Usuario[] = []
    const { rol, termino, pagina, limite } = params;

    

    const consulta = TblUsuarios.query().where('usn_rol_id','<>','010')
    if (rol) {
      consulta.where('usn_rol_id', rol)
    }
if(termino){
  consulta.andWhere((subquery) => {
    subquery.whereRaw("LOWER(usn_correo) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(usn_nombre) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(usn_apellido) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(usn_identificacion) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
    subquery.orWhereRaw("LOWER(usn_usuario) LIKE LOWER(?)", [
      `%${termino}%`,
    ]);
  });
}
    

    const usuariosDB = await consulta.orderBy('usn_nombre', 'asc').paginate(pagina, limite)

    usuariosDB.forEach(usuariosDB => {
      usuarios.push(usuariosDB.obtenerUsuario())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(usuariosDB)
    return {usuarios , paginacion}
  }

  async obtenerUsuarioPorId (id: string): Promise<Usuario> {
    const usuario = await TblUsuarios.findOrFail(id)
    return usuario.obtenerUsuario()
  }

  async obtenerUsuarioPorRol (rol: string): Promise<Usuario[]> {
    const usuarios: any[] = []
    const usuariosDB = await TblUsuarios.query().where('usn_rol_id', rol).orderBy('id', 'desc')
    usuariosDB.forEach(usuarioDB => {

      /* usuarios.push(usuariosDB.obtenerUsuario()) */
      usuarios.push({
      //  id: usuarioDB.id,
        nombre: usuarioDB.nombre,
        identificacion: usuarioDB.identificacion
      })
    })
    return usuarios
  }

  async obtenerUsuarioPorUsuario (nombreUsuario: string): Promise<Usuario | null>{
    //const usuario = await TblUsuarios.query().where('identificacion', '=', nombreUsuario).first()
    const usuario = await TblUsuarios.query().where('usuario', '=', nombreUsuario).first()
    if(usuario){
      return usuario.obtenerUsuario()
    }
    return null
  }

  async guardarUsuario (usuario: Usuario): Promise<Usuario> {

    const existe = await TblUsuarios.query().where('identificacion', '=', usuario.identificacion).orWhere('usn_usuario', usuario.usuario).first()
    if(existe){
      throw new Error('Ya existe un registro con esta identificación o con este usuario de acceso')
    }
    let usuarioDB = new TblUsuarios()
    usuarioDB.establecerUsuarioDb(usuario)
    await usuarioDB.save()
    return usuarioDB
  }

  async actualizarUsuario (id: string, usuario: Usuario, payload?:PayloadJWT): Promise<Usuario> {
    let usuarioRetorno = await TblUsuarios.findOrFail(id)
   
    
   /*  const usuarioAnterior = usuarioRetorno; */
   console.log(usuario);
   if (usuario.usuario !== usuarioRetorno.usuario) {
    const existe = await TblUsuarios.query().where('usn_usuario', usuario.usuario).first()
    if(existe){
      throw new Error('Ya existe un registro con este usuario de acceso')
    }
   }
    
    usuarioRetorno.estableceUsuarioConId(usuario)
    await usuarioRetorno.save()
    

    return usuarioRetorno
  }

 

}
