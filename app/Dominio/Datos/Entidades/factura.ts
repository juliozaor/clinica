
import { Detalle } from "./detalle";
import { Estado } from "./estado";
export class Factura {
  RUT_PAC?:string;
  COD_CONVENIO?:string;
  CONVENIO?:string;
  AMBITO?:string;
  RPA_FOR_FECHADIGIT?:string;
  RPA_FOR_NUMERFORMU?:string;
  RPA_FOR_FECHATENCION?:string;
  VALORCTA?:number;
  CODIGOCENTROATEN?:string;
  fcarga?:string;
  estadoId?:number;
  estado_id?:number;
  fultestado?:string;
  fanalizarinfo?:string;
  uanalizarinfo?:number;
  fescalargestion?:string;
  uescalargestion?:number;
  fmarcarprestacion?:string;
  umarcarprestacion?:number;
  fenviobot?:string;
  descbot?:string;
  nfactura?:string;
  detalles?: Detalle[];
  RPA_FOR_TIPOFORMU?:string;
  RPA_FOR_NUMERFORMU_PID?:string
  procesar?:string
  pausar?:string
  TIPO?:string;
  NOM_PAC?:string;
  EMPRESA?:string;
  RPA_FOR_ETDCTA?:string;
  RPA_FOR_VIGENCIA?:string;
  estado?:Estado;


} 