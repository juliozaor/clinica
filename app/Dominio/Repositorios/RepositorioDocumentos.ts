import { PayloadJWT } from '../Dto/PayloadJWT';
import { Paginador } from '../Paginador';

export interface RepositorioDocumentos {
  obtenerDocumentos(param: any, documento:number): Promise<{}>
}
