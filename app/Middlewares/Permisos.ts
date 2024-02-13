
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import TblFuncionalidades from 'App/Infraestructura/Datos/Entidad/Autorizacion/Funcionalidades';
import TblRolesModulos from 'App/Infraestructura/Datos/Entidad/Autorizacion/RolesModulos';

export default class Permisos {

  async handle({ request, response }:HttpContextContract, next, permisos) {
    const { idRol } = await request.obtenerPayloadJWT()
    const  idModulo = permisos[0];
    const idFuncionalidad  = permisos[1];


    const rolModulo = await TblRolesModulos.query().where(
      {
        'rom_rol_id':idRol,
        'rom_modulo_id':idModulo
      }).first()

      if (!rolModulo?.id) {
        return response.status(403).json({
          message: 'No tienes permisos para acceder a esta ruta.1',
        });
      }
    
    const modulosFuncionalidades =  await TblFuncionalidades.query().whereHas('rolModuloFuncionalidad', (sqlFuncionalidad) =>{
      sqlFuncionalidad.where({'rmf_rol_modulo_id':rolModulo.id,'rmf_funcionalidad_id':idFuncionalidad})
    })
    

    if (modulosFuncionalidades.length === 0) {
      return response.status(403).json({
        message: 'No tienes permisos para acceder a esta ruta.2',
      });
    }

    await next();
  }

}
