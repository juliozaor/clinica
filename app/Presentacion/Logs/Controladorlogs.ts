/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioLog } from 'App/Dominio/Datos/Servicios/ServicioLog'
import { RepositorioLogDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioLogDB'

export default class ControladorLogs {
  private service: ServicioLog
  constructor () {
    this.service = new ServicioLog(new RepositorioLogDB())
  }

  public async obtener ({ request}:HttpContextContract) {
    const documentos = await this.service.obtenerLogLogin(request.all())
    return documentos
  }



}
