
import { Paginador } from '../../Paginador';
import { RepositorioLogs } from 'App/Dominio/Repositorios/RepositorioLogs';
import { LogLogin } from '../Entidades/LogLogin';

export class ServicioLog{
  constructor (private repositorio: RepositorioLogs) { }

  async obtenerLogLogin (params: any): Promise<{ logs: LogLogin[], paginacion: Paginador }> {
    return this.repositorio.obtenerLogsLogin(params);
  }

}
