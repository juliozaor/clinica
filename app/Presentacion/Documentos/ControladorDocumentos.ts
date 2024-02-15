/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioDocumentos } from 'App/Dominio/Datos/Servicios/ServicioDocumentos'
import { RepositorioDocumentosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioDocumentosDB'

export default class ControladorDocumentos {
  private service: ServicioDocumentos
  constructor () {
    this.service = new ServicioDocumentos(new RepositorioDocumentosDB())
  }

  public async mostrar ({ request}) {
    const payload = await request.obtenerPayloadJWT()
    const documentos = await this.service.obtenerDocumentos(request.all(), payload.documento)
    return documentos
  }

}
