import { BaseModel, HasMany, HasOne, column, hasMany, hasOne} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { TblEstados } from './Estados';
import { TblDetalles } from './Detalles';

export class TblFacturacion extends BaseModel {
  public static readonly table = 'BOTF_FACTURACION'
 @column({ columnName: 'RUT_PAC' }) public RUT_PAC: string
 @column({ columnName: 'COD_CONVENIO' }) public COD_CONVENIO: string
 @column({ columnName: 'CONVENIO' }) public CONVENIO: string
 @column({ columnName: 'AMBITO' }) public AMBITO: string
 @column({ columnName: 'RPA_FOR_FECHADIGIT' }) public RPA_FOR_FECHADIGIT: DateTime
 @column({ columnName: 'RPA_FOR_NUMERFORMU' }) public RPA_FOR_NUMERFORMU: string
 @column({ columnName: 'RPA_FOR_FECHATENCION' }) public RPA_FOR_FECHATENCION: DateTime
 @column({ columnName: 'VALORCTA' }) public VALORCTA: number
 @column({ columnName: 'CODIGOCENTROATEN' }) public CODIGOCENTROATEN: string
 @column({ columnName: 'fcarga' }) public fcarga: DateTime
 @column({ columnName: 'estadoId' }) public estadoId: number
 @column({ columnName: 'fultestado' }) public fultestado: DateTime
 @column({ columnName: 'fanalizarinfo' }) public fanalizarinfo: DateTime
 @column({ columnName: 'uanalizarinfo' }) public uanalizarinfo: number
 @column({ columnName: 'fescalargestion' }) public fescalargestion: DateTime
 @column({ columnName: 'uescalargestion' }) public uescalargestion: number
 @column({ columnName: 'fmarcarprestacion' }) public fmarcarprestacion: DateTime
 @column({ columnName: 'umarcarprestacion' }) public umarcarprestacion: number
 @column({ columnName: 'fenviobot' }) public fenviobot: DateTime
 @column({ columnName: 'descbot' }) public descbot: string
 
 
 @hasOne( ()=> TblEstados, {
 localKey:'id',
 foreignKey: 'estadoId'
 })
 public estado: HasOne<typeof TblEstados>

 @hasMany( ()=> TblDetalles,{
  localKey:'RPA_FOR_NUMERFORMU',
 foreignKey: 'RPA_FOR_NUMERFORMU'
 })
 public detalles: HasMany<typeof TblDetalles>

}


