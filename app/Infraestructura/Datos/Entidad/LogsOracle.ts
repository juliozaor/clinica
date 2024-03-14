import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblLogsOracles extends BaseModel {
  @column({ columnName: 'id' })
  public id?: string;
  @column({ columnName: 'accion' })
  public accion: string;
  @column({ columnName: 'estado' })
  public estado: string;

  @column.dateTime({ autoCreate: true, columnName: 'creacion' })
  public creacion: DateTime


}
 

