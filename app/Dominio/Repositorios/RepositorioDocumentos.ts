import { Factura } from '../Datos/Entidades/factura';
import { PayloadJWT } from '../Dto/PayloadJWT';
import { Paginador } from '../Paginador';

export interface RepositorioDocumentos {
  obtenerDocumentos(param: any, documento:number): Promise<{}>
  actualizarFactura(estado:number, factura:Factura, documento:number,boton:number): Promise<{}>
}
