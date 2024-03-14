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
 @column({ columnName: 'RPA_FOR_FECHADIGIT' }) public RPA_FOR_FECHADIGIT: string
 @column({ columnName: 'RPA_FOR_NUMERFORMU' }) public RPA_FOR_NUMERFORMU: string
 @column({ columnName: 'RPA_FOR_FECHATENCION' }) public RPA_FOR_FECHATENCION: string
 @column({ columnName: 'VALORCTA' }) public VALORCTA: number
 @column({ columnName: 'CODIGOCENTROATEN' }) public CODIGOCENTROATEN: string
 @column({ columnName: 'fcarga' }) public fcarga: string
 @column({ columnName: 'estadoId' }) public estadoId: number
 @column({ columnName: 'fultestado' }) public fultestado: string
 @column({ columnName: 'fanalizarinfo' }) public fanalizarinfo: string
 @column({ columnName: 'uanalizarinfo' }) public uanalizarinfo: number
 @column({ columnName: 'fescalargestion' }) public fescalargestion: string
 @column({ columnName: 'uescalargestion' }) public uescalargestion: number
 @column({ columnName: 'fmarcarprestacion' }) public fmarcarprestacion: string
 @column({ columnName: 'umarcarprestacion' }) public umarcarprestacion: number
 @column({ columnName: 'fenviobot' }) public fenviobot: string
 @column({ columnName: 'descbot' }) public descbot: string
 @column({ columnName: 'nfactura' }) public nfactura: string
 
 
 @hasOne( ()=> TblEstados, {
 localKey:'estadoId',
 foreignKey: 'id'
 })
 public estado: HasOne<typeof TblEstados>

 @hasMany( ()=> TblDetalles,{
  localKey:'RPA_FOR_NUMERFORMU',
 foreignKey: 'RPA_FOR_NUMERFORMU'
 })
 public detalles: HasMany<typeof TblDetalles>

}


