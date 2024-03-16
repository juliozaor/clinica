import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblLogsArchivos extends BaseModel {
  @column({ columnName: 'id' })
  public id?: string;
  @column({ columnName: 'factura' })
  public factura: string;
  @column({ columnName: 'archivo' })
  public archivo: string;
  @column({ columnName: 'accion' })
  public accion: string;
  @column({ columnName: 'usuario' })
  public usuario: string;
  @column({ columnName: 'estado' })
  public estado: string;

  @column.dateTime({ autoCreate: true, columnName: 'creacion' })
  public creacion: DateTime
  
  
  
  

}
 

