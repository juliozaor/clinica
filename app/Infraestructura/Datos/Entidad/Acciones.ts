import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export class TblAcciones extends BaseModel {
 @column({ columnName: 'id' }) public id: number
 @column({ columnName: 'accion' }) public accion: string
 
}


