import { FacturaRPA } from '../Datos/Entidades/facturaRPA';
import { RegistroRPA } from '../Datos/Entidades/registroRPA';
import { Paginador } from '../Paginador';

export interface RepositorioArchivo {
obtenerFacturas(params:any):Promise<{facturaRpa: FacturaRPA[], paginacion: Paginador}>
obtenerRegistros(params:any):Promise<{registroRpa: RegistroRPA[], paginacion: Paginador}>
 obtenerArchivo(nombre:string, factura:string):Promise<{}>
 actualizarArchivo(archvo: any, nombre:string, factura:string):Promise<{}>
 eliminarArchivo(nombre:string, factura:string):Promise<{}>

}
