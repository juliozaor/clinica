/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioRol } from 'App/Dominio/Datos/Servicios/ServicioRol'
import { RepositorioRolDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioRolDB'

export default class ControladorRol {
  private service: ServicioRol
  constructor () {
    this.service = new ServicioRol(new RepositorioRolDB())
  }

  public async listar ({ request }) {
    const rol = await this.service.obtenerRols(request.all())
    return rol
  }

  
  public async listarTodos ({ request }) {
    const roles = await this.service.obtenerTodos(request.all())
    return roles
  }

  public async obtenerRolPorId ({ params }) {
    const rol = await this.service.obtenerPorId(params.id)
    return rol
  }
  
/*   public async registrar ({ request }) {
    const datarol = request.all()
    const rol = await this.service.guardar(datarol)
    return rol
  }
  public async actualizar ({ params, request }) {
    const datarol = request.all()
    const rol = await this.service.actualizar(params.id, datarol)
    return rol
  } */


/*   public async cambiarEstado ({request, response}:HttpContextContract){
    try{
      let id = request.param('id')
      await this.service.cambiarEstado(id)
      response.status(200).send('Cambio realizado correctamente')
    } catch (e) {
      response.status(200).send(e)
    }
  } */
}
