
import { Detalle } from "./detalle";
export class Factura {
  rut_pac?:string;
  cod_convenio?:string;
  convenio?:string;
  ambito?:string;
  rpa_for_fechadigit?:string;
  rpa_for_numerformu?:string;
  rpa_for_fechatencion?:string;
  valorcta?:number;
  codigocentroaten?:string;
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
  detalles?: Detalle[];
} 