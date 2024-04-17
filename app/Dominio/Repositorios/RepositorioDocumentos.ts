import { Factura } from '../Datos/Entidades/factura';
import { PayloadJWT } from '../Dto/PayloadJWT';
import { Paginador } from '../Paginador';
import { EstadosSoportes } from '../EstadosSoporte';

export interface RepositorioDocumentos {
  obtenerDocumentos(param: any, documento:number): Promise<{}>
  obtenerDocumentosAgrupados(param: any, documento:number): Promise<{}>
  obtenerCausas(): Promise<{}>
  actualizarFactura(estado:number, factura:Factura, documento:string,boton:number, rol:string): Promise<{}>
  actualizarFacturaAgrupados(estado:number, factura:Factura[], documento:string,boton:number, rol:string): Promise<{}>
  buscarDocumentos(param: any, documento:number): Promise<{formularios: Factura[], paginacion: Paginador}>
  obtenerBusqueda(param: any, documento:number): Promise<{formularios: Factura[], tipo:string, estado:number}>

}
