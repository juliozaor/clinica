import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

export class TblLogsRobots extends BaseModel {
  @column({ columnName: 'id' })
  public id?: string;
  @column({ columnName: 'rpa_for_numerformu' })
  public rpaForNumerformu: string;
  @column({ columnName: 'descripcion' })
  public descripcion: string;
  @column({ columnName: 'estado' })
  public estado: number;

  @column.dateTime({ autoCreate: true, columnName: 'creacion' })
  public creacion: DateTime


}
 

