/* eslint-disable @typescript-eslint/semi */
import { Rol } from '../Datos/Entidades/Autorizacion/Rol';
import { Paginador } from '../Paginador';

export interface RepositorioRol {
  obtenerRols(param: any): Promise<{rols: Rol[], paginacion: Paginador}>
  obtenerTodos(param: any): Promise<{rols: Rol[], paginacion: Paginador}>
  obtenerPorId(id: string): Promise<Rol>
 /*  guardar(rol: Rol): Promise<Rol>
  actualizar(rol: Rol): Promise<Rol> */
}
