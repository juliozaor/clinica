import { BaseModel, HasOne, column, hasOne} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { TblEstados } from './Estados';

export class TblDetalles extends BaseModel {
  public static readonly table = 'BOTF_FACTURACIONDETALLE'
 @column({ columnName: 'RUT_PAC' }) public RUT_PAC: string
 @column({ columnName: 'COD_CONVENIO' }) public COD_CONVENIO: string
 @column({ columnName: 'RPA_FOR_FECHADIGIT' }) public RPA_FOR_FECHADIGIT: DateTime
 @column({ columnName: 'RPA_FOR_NUMERFORMU' }) public RPA_FOR_NUMERFORMU: string
 @column({ columnName: 'ATE_PRE_CODIGO' }) public ATE_PRE_CODIGO: string
 @column({ columnName: 'PRE_PRE_DESCRIPCIO' }) public PRE_PRE_DESCRIPCIO: string
 @column({ columnName: 'PRE_TIP_DESCRIPCIO' }) public PRE_TIP_DESCRIPCIO: string
 @column({ columnName: 'RPA_FOR_FECHATENCION' }) public RPA_FOR_FECHATENCION: DateTime
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

 @hasOne( ()=> TblEstados, {
  localKey:'id',
  foreignKey: 'estadoId'
  })
  public estado: HasOne<typeof TblEstados>

}


