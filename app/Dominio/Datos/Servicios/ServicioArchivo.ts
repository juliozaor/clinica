
import { Paginador } from '../../Paginador';
import { RepositorioArchivo } from 'App/Dominio/Repositorios/RepositorioArchivo';
import { FacturaRPA } from '../Entidades/facturaRPA';
import { RegistroRPA } from '../Entidades/registroRPA';

export class ServicioArchivo{
  constructor (private repositorio: RepositorioArchivo) { }

  async obtenerFacturas (params: any): Promise<{ facturaRpa: FacturaRPA[], paginacion: Paginador }> {
    return this.repositorio.obtenerFacturas(params);
  }

  async obtenerRegistros (params: any): Promise<{ registroRpa: RegistroRPA[], paginacion: Paginador }> {
    return this.repositorio.obtenerRegistros(params);
  }

  async obtenerArchivo (nombre: string, factura:string) {
    return this.repositorio.obtenerArchivo(nombre, factura);
  }

  async actualizarArchivo (archivo:any, nombre: string, factura:string) {
    return this.repositorio.actualizarArchivo(archivo, nombre, factura);
  }

  async eliminarArchivo (archivo:any, nombre: string) {
    return this.repositorio.eliminarArchivo(archivo, nombre);
  }


}
