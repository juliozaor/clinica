import { LogLogin } from '../Datos/Entidades/LogLogin';
import { Paginador } from '../Paginador';

export interface RepositorioLogs {
  obtenerLogsLogin(param: any): Promise<{logs: LogLogin[], paginacion: Paginador}>
}
