/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDocumentos } from 'App/Dominio/Repositorios/RepositorioDocumentos'
//import { Documentos } from '../Entidades/Autorizacion/Documentos'
import { Paginador } from '../../Paginador';
import { Factura } from '../Entidades/factura';

export class ServicioDocumentos{
  constructor (private repositorio: RepositorioDocumentos) { }

  async obtenerDocumentos (params: any, documento:number): Promise<{}> {
    return this.repositorio.obtenerDocumentos(params, documento);
  }

  async obtenerDocumentosAgrupados (params: any, documento:number): Promise<{}> {
    return this.repositorio.obtenerDocumentosAgrupados(params, documento);
  }

  async obtenerCausas (): Promise<{}> {
    return this.repositorio.obtenerCausas();
  }

  async actualizarFactura (estado:number, factura:Factura, documento:string,boton:number, rol:string): Promise<{}> {
    return this.repositorio.actualizarFactura(estado, factura,documento,boton, rol);
  }

  async actualizarFacturaAgrupados (estado:number, factura:Factura[], documento:string,boton:number, rol:string): Promise<{}> {
    return this.repositorio.actualizarFacturaAgrupados(estado, factura,documento,boton, rol);
  }

  async buscarDocumentos (params: any, documento:number): Promise<{formularios: Factura[], paginacion: Paginador}> {
    return this.repositorio.buscarDocumentos(params, documento);
  }

  async obtenerBusqueda (params: any, documento:number): Promise<{formularios: Factura[], tipo:string, estado:number}> {
    return this.repositorio.obtenerBusqueda(params, documento);
  }

}
