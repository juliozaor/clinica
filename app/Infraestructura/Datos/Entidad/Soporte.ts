import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export class TblSoporte extends BaseModel {
  public static readonly table = "Soporte";
  @column({ columnName: "cod_convenio" })
  public cod_convenio: number;
  @column({ columnName: "nombre_soporte" })
  public nombre_soporte: string;
  @column({ columnName: "soporte_necesario" })
  public soporte_necesario: string;
  @column({ columnName: "nombramiento" })
  public nombramiento: string;
  @column({ columnName: "ID" })
  public ID: number;
}
