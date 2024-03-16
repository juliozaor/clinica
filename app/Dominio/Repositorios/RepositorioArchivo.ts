import { FacturaRPA } from '../Datos/Entidades/facturaRPA';
import { RegistroRPA } from '../Datos/Entidades/registroRPA';
import { Paginador } from '../Paginador';

export interface RepositorioArchivo {
obtenerFacturas(params:any, documento:string):Promise<{facturaRpa: FacturaRPA[], paginacion: Paginador}>
obtenerRegistros(params:any, documento:string):Promise<{registroRpa: RegistroRPA[], paginacion: Paginador}>
 obtenerArchivo(nombre:string, factura:string, documento:string):Promise<{}>
 actualizarArchivo(archvo: any, nombre:string, factura:string, documento:string):Promise<{}>
 eliminarArchivo(nombre:string, factura:string, documento:string, id:number):Promise<{}>
 guardarArchivo(archvo: any,tiposoporte:string,factura:string, documento:string):Promise<{}>
 obtenerSoportes():Promise<{}>

}
