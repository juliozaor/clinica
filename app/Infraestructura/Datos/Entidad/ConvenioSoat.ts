import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export class TblCodConvenio extends BaseModel {
  public static readonly table = 'BOTF_CONV_SOAT'
 @column({ columnName: 'COD_CONVENIO' }) public COD_CONVENIO: string
 @column({ columnName: 'CONVENIO' }) public CONVENIO: string
 @column({ columnName: 'fcreacion' }) public fcreacion: DateTime
 @column({ columnName: 'estadoId' }) public estadoId: number
 @column({ columnName: 'userId' }) public userId: number
 
}


