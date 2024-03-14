import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblLogsLogins extends BaseModel {
  @column({ columnName: 'id' })
  public id?: string;
  @column({ columnName: 'usuario' })
  public usuario: string;
  @column({ columnName: 'estado_login' })
  public estadoLogin: string;
  @column({ columnName: 'mensaje_error' })
  public mensajeError: string;

  @column.dateTime({ autoCreate: true, columnName: 'creacion' })
  public creacion: DateTime


}
 

