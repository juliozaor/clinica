import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export class TblCausas extends BaseModel {
  public static readonly table = 'BOTF_causal'
 @column({ columnName: 'id' }) public id: number
 @column({ columnName: 'nombre' }) public nombre: string
 
}


