class DETALLEROBOT{
  ATE_PRE_CODIGO:string;
    PRE_PRE_DESCRIPCIO:string;
    PRE_TIP_DESCRIPCIO:string;
    TIPO_FORMULARIO:string
}
export class ROBOT{ 
  RUT_PAC: string;
    COD_CONVENIO: string;
    CONVENIO: string;
    AMBITO: string;
    RPA_FOR_FECHADIGIT: string;
    RPA_FOR_NUMERFORMU: string;
    RPA_FOR_FECHATENCION: string;
    RPA_FOR_TIPOFORMU:string;
    VALORCTA: string;
    CODIGOCENTROATEN: string;
    ESSOAT:Boolean = false
    DETALLES: DETALLEROBOT[]
 }