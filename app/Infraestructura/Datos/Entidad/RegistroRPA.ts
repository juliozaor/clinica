import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export class TblRegistroRPA extends BaseModel {
  public static readonly table = "RegistroRPA";

  @column({ columnName: "hora_inicio" })
  public hora_inicio: string;
  @column({ columnName: "hora_fin" })
  public hora_fin: string;
  @column({ columnName: "estado" })
  public estado: string;
  @column({ columnName: "nombre_pdf" })
  public nombre_pdf: string;
  @column({ columnName: "Tipo_soporte" })
  public Tipo_soporte: string;
  @column({ columnName: "Factura" })
  public Factura: string;
  @column({ columnName: "ID" })
  public ID: number;
  @column({ columnName: "type_process" })
  public type_process: string;
  @column({ columnName: "usn_id" })
  public usn_id: number;
}
