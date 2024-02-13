/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { DateTime } from 'luxon';
import { BaseModel, ManyToMany, column, manyToMany} from '@ioc:Adonis/Lucid/Orm';
import { Funcionalidad } from 'App/Dominio/Datos/Entidades/Autorizacion/Funcionalidad';
import TblRolesModulos from './RolesModulos';
export default class TblFuncionalidades extends BaseModel {
  public static readonly table = 'tbl_funcionalidades'

  @column({ isPrimary: true, columnName: 'fun_id' }) public id: string

  @column({ columnName: 'fun_nombre' }) public nombre: string

  @column({ columnName: 'fun_estado' }) public estado: boolean

  @column.dateTime({ autoCreate: true, columnName: 'fun_creado' }) public creacion: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'fun_actualizado' }) public actualizacion: DateTime

  public establecerFuncionalidadDb (funcionalidad: Funcionalidad):void{
    this.id = funcionalidad.id
    this.nombre = funcionalidad.nombre
    this.estado = funcionalidad.estado
    this.creacion = funcionalidad.creacion;
    this.actualizacion = funcionalidad.actualizacion;
  }

  public obtenerFuncionalidad(): Funcionalidad{
    return new Funcionalidad(
      this.id,
      this.nombre,
      this.estado,
      this.creacion,
      this.actualizacion
    )
  }

  @manyToMany(() => TblRolesModulos, {
    localKey: 'id',
    pivotForeignKey: 'rmf_funcionalidad_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'rmf_rol_modulo_id', 
    pivotTable: 'tbl_roles_modulos_funcionalidades'
  })
  public rolModuloFuncionalidad: ManyToMany<typeof TblRolesModulos>


}
