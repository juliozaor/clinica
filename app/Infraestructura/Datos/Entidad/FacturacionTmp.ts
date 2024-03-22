import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export class TblFacturacionTmp extends BaseModel {
  public static readonly table = 'BOTF_TMP_FACTURACION'
 @column({ columnName: 'RUT_PAC' }) public RUT_PAC: string
 @column({ columnName: 'COD_CONVENIO' }) public COD_CONVENIO: string
 @column({ columnName: 'CONVENIO' }) public CONVENIO: string
 @column({ columnName: 'AMBITO' }) public AMBITO: string
 @column({ columnName: 'RPA_FOR_FECHADIGIT' }) public RPA_FOR_FECHADIGIT: string
 @column({ columnName: 'RPA_FOR_NUMERFORMU' }) public RPA_FOR_NUMERFORMU: string
 @column({ columnName: 'RPA_FOR_FECHATENCION' }) public RPA_FOR_FECHATENCION: string
 @column({ columnName: 'VALORCTA' }) public VALORCTA: number
 @column({ columnName: 'CODIGOCENTROATEN' }) public CODIGOCENTROATEN: string
 

}


