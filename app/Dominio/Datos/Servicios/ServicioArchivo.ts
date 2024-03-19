
import { Paginador } from '../../Paginador';
import { RepositorioArchivo } from 'App/Dominio/Repositorios/RepositorioArchivo';
import { FacturaRPA } from '../Entidades/facturaRPA';
import { RegistroRPA } from '../Entidades/registroRPA';

export class ServicioArchivo{
  constructor (private repositorio: RepositorioArchivo) { }

  async obtenerFacturas (params: any, documento:string): Promise<{ facturaRpa: FacturaRPA[], paginacion: Paginador }> {
    return this.repositorio.obtenerFacturas(params, documento);
  }

  async obtenerRegistros (params: any, documento:string): Promise<{ registroRpa: RegistroRPA[], paginacion: Paginador }> {
    return this.repositorio.obtenerRegistros(params, documento);
  }

  async obtenerArchivo (nombre: string, factura:string, documento:string) {
    return this.repositorio.obtenerArchivo(nombre, factura, documento);
  }

  async actualizarArchivo (archivo:any, nombre: string, factura:string, documento:string) {
    return this.repositorio.actualizarArchivo(archivo, nombre, factura, documento);
  }

  async eliminarArchivo (archivo:any, nombre: string, documento:string, id:number) {
    return this.repositorio.eliminarArchivo(archivo, nombre, documento, id);
  }

  async guardarArchivo (archivo:any, tiposoporte: string, factura: string, documento:string) {
    return this.repositorio.guardarArchivo(archivo,tiposoporte, factura, documento);
  }

  async obtenerSoportes () {
    return this.repositorio.obtenerSoportes();
  }


}
