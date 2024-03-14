import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { TblAcciones } from "./Acciones";

export class TblLogsForms extends BaseModel {
  @column({ columnName: "id" })
  public id?: string;
  @column({ columnName: "usuario" })
  public usuario: string;
  @column({ columnName: "rol" })
  public rol: string;
  @column({ columnName: "rpa_for_numerformu" })
  public rpaForNumerformu: string;
  @column({ columnName: "accion_id" })
  public accionId: number;
  @column({ columnName: "estado" })
  public estado: number;

  @column.dateTime({ autoCreate: true, columnName: "creacion" })
  public creacion: DateTime;

  @hasOne(() => TblAcciones, {
    localKey: "accionId",
    foreignKey: "id",
  })
  public accion: HasOne<typeof TblAcciones>;
}
