/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioDocumentos } from 'App/Dominio/Repositorios/RepositorioDocumentos'
//import { Documentos } from '../Entidades/Autorizacion/Documentos'
import { Paginador } from '../../Paginador';

export class ServicioDocumentos{
  constructor (private repositorio: RepositorioDocumentos) { }

 

  async obtenerDocumentos (params: any, documento:number): Promise<{}> {
    return this.repositorio.obtenerDocumentos(params, documento);
  }

}
