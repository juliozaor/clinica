/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { RepositorioRol } from 'App/Dominio/Repositorios/RepositorioRol'
import { Rol } from '../Entidades/Autorizacion/Rol'
import { Paginador } from '../../Paginador';

export class ServicioRol{
  constructor (private repositorio: RepositorioRol) { }
  
  async obtenerRols (params: any): Promise<{ rols: Rol[], paginacion: Paginador }> {
    return this.repositorio.obtenerRols(params);
  }

  async obtenerTodos (params: any): Promise<{ rols: Rol[], paginacion: Paginador }> {
    return this.repositorio.obtenerTodos(params);
  }

  async obtenerPorId (id: string): Promise<Rol>{
    return this.repositorio.obtenerPorId(id)
  }

/*   async guardar (rol: Rol): Promise<Rol>{
    return this.repositorio.guardar(rol);
  }

  async actualizar (rol: Rol): Promise<Rol>{
    return this.repositorio.actualizar(rol);
  } */


}

