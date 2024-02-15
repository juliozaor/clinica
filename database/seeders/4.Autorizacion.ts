import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { v4 as uuid } from "uuid"
import { FUNCIONALIDADES, MODULOS, ROLES } from 'App/Dominio/DiccionarioAutorizacion'

export default class extends BaseSeeder {
    public async run() {
        await this.asignarModulosARoles()
        await this.asignarPermisosSuperUsuario()
    }

    private async asignarModulosARoles() {
        await Database
            .table('tbl_roles_modulos')
            .multiInsert([
                {
                rom_id: 1,
                rom_rol_id:  ROLES.ADMINISTRADOR,
                rom_modulo_id: MODULOS.USUARIOS
                },
                {
                rom_id: 2,
                rom_rol_id:  ROLES.ADMINISTRADOR,
                rom_modulo_id: MODULOS.ANALIZAR
                },
                {
                rom_id: 3,
                rom_rol_id:  ROLES.ADMINISTRADOR,
                rom_modulo_id: MODULOS.GESTIONAR
                },
                {
                rom_id: 4,
                rom_rol_id:  ROLES.ADMINISTRADOR,
                rom_modulo_id: MODULOS.VALIDAR
                },
                {
                rom_id: 5,
                rom_rol_id:  ROLES.EJECUTIVO,
                rom_modulo_id: MODULOS.ANALIZAR
                },
                {
                rom_id: 6,
                rom_rol_id:  ROLES.EJECUTIVO,
                rom_modulo_id: MODULOS.GESTIONAR
                },
                {
                rom_id: 7,
                rom_rol_id:  ROLES.EJECUTIVO,
                rom_modulo_id: MODULOS.VALIDAR
                }
                
            ])
    }

    private async asignarPermisosSuperUsuario(){
        await Database
            .table('tbl_roles_modulos_funcionalidades')
            .multiInsert([
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: 1,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.CREAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: 1,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.LEER,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: 1,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.ACTUALIZAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: 1,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.ELIMINAR,
                },
                
            ])
    }

   /*  private async asignarPermisosUsuario(){
        await Database
            .table('tbl_roles_modulos_funcionalidades')
            .multiInsert([
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: this.idModulo,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.CREAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: this.idModulo,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.LEER,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: this.idModulo,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.ACTUALIZAR,
                },
                {
                    rmf_id: uuid(),
                    rmf_rol_modulo_id: this.idModulo,                    
                    rmf_funcionalidad_id: FUNCIONALIDADES.ELIMINAR,
                },
            ])
    } */
}
