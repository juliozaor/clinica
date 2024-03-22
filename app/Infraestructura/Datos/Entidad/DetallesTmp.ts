import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblDetallesTmp extends BaseModel {
  public static readonly table = 'BOTF_TMP_FACTURACIONDETALLE'
 @column({ columnName: 'RUT_PAC' }) public RUT_PAC: string
 @column({ columnName: 'COD_CONVENIO' }) public COD_CONVENIO: string
 @column({ columnName: 'RPA_FOR_FECHADIGIT' }) public RPA_FOR_FECHADIGIT: DateTime
 @column({ columnName: 'RPA_FOR_NUMERFORMU' }) public RPA_FOR_NUMERFORMU: string
 @column({ columnName: 'ATE_PRE_CODIGO' }) public ATE_PRE_CODIGO: string
 @column({ columnName: 'PRE_PRE_DESCRIPCIO' }) public PRE_PRE_DESCRIPCIO: string
 @column({ columnName: 'PRE_TIP_DESCRIPCIO' }) public PRE_TIP_DESCRIPCIO: string
 @column({ columnName: 'RPA_FOR_FECHATENCION' }) public RPA_FOR_FECHATENCION: DateTime

}


