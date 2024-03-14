import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export class TblFacturaRPA extends BaseModel {
  public static readonly table = 'FacturaRPA'
  @column({ columnName: "cod_convenio" })
  public cod_convenio: number;
  @column({ columnName: "Rut" })
  public Rut: string;
  @column({ columnName: "Factura" })
  public Factura: string;
  @column({ columnName: "Descripcion_Convenio" })
  public Descripcion_Convenio: string;
  @column({ columnName: "Vr_Factura" })
  public Vr_Factura: number;
  @column({ columnName: "Fecha_Facturacion" })
  public Fecha_Facturacion: string;
  @column({ columnName: "Documento_Identificacion" })
  public Documento_Identificacion: string;
  @column({ columnName: "Nro_Planilla" })
  public Nro_Planilla: string;
  @column({ columnName: "Ambito" })
  public Ambito: string;
  @column({ columnName: "Fecha_Formulario" })
  public Fecha_Formulario: string;
  @column({ columnName: "ID_Factura" })
  public ID_Factura: number;
  @column({ columnName: "Tipo_Factura" })
  public Tipo_Factura: string;
  @column({ columnName: "Estado " })
  public Estado: string;
}
