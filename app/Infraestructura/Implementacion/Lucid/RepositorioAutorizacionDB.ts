import { Modulo } from "App/Dominio/Datos/Entidades/Autorizacion/Modulo";
import { Rol } from "App/Dominio/Datos/Entidades/Autorizacion/Rol";
import { RepositorioAutorizacion } from "App/Dominio/Repositorios/RepositorioAutorizacion";
import TblModulos from "App/Infraestructura/Datos/Entidad/Autorizacion/Modulo";
import TblRoles from "App/Infraestructura/Datos/Entidad/Autorizacion/Rol";
import tbl_funcionalidades from "App/Infraestructura/Datos/Entidad/Autorizacion/Funcionalidades";
import TblFuncionalidades from "App/Infraestructura/Datos/Entidad/Autorizacion/Funcionalidades";

export class RepositorioAutorizacionDB implements RepositorioAutorizacion {
  private readonly TABLA_ROLES = "tbl_roles";
  private readonly TABLA_ROLES_MODULOS = "tbl_roles_modulos";
  private readonly TABLA_MODULOS = "tbl_modulos";
  private readonly TABLA_FUNCIONALIDADES = "tbl_funcionalidades";

  async obtenerRolConModulosYPermisos(idRol: string): Promise<Rol> {
    const rol = (await TblRoles.findOrFail(idRol)).obtenerRol();
    let modulos = await this.obtenerModulosDeUnRol(idRol);    
    modulos.forEach((modulo) => {
      rol.agregarModulo(modulo);
    });    
    return rol;
  }

  private async obtenerModulosDeUnRol(idRol: string): Promise<Modulo[]> {
    const modulosDb = await TblModulos.query()
      .preload("rolModulo", (sqlRolModulo) => {
        sqlRolModulo.where("rom_rol_id", idRol);
      })
      .whereHas("rolModulo", (sqlRolModulo) => {
        sqlRolModulo.where("rom_rol_id", idRol);
      }).orderBy('mod_orden', 'asc');

      let modulos: Modulo[] = [];

      for await (const moduloDb of modulosDb) {
          const idRolModulo = moduloDb.$preloaded.rolModulo[0].id;
          const modulo = moduloDb.obtenerModulo();
          const funcionalidades = await TblFuncionalidades.query()/* .preload(
            "rolModuloFuncionalidad",
            (sqlRolModulo) => {
              sqlRolModulo.where("rmf_rol_modulo_id", idRolModulo);
            }
          ) */
          .whereHas(
            "rolModuloFuncionalidad",
            (sqlRolModulo) => {
              sqlRolModulo.where("rmf_rol_modulo_id", idRolModulo);
            }
          );


          funcionalidades.forEach((funcionalidad) => {
            modulo.agregarFuncionalidad(funcionalidad.obtenerFuncionalidad());
          });
          
          modulos.push(modulo) ;
        
      }


    return modulos
  }
}
