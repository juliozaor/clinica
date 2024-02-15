import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export class TblEstados extends BaseModel {
  public static readonly table = 'BOTF_estado'
 @column({ columnName: 'id' }) public id: number
 @column({ columnName: 'nombre' }) public nombre: string
 
}


