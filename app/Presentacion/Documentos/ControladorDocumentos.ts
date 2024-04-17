/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Factura } from 'App/Dominio/Datos/Entidades/factura'
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

  public async mostrarAgrupadas ({ request}) {
    const payload = await request.obtenerPayloadJWT()
    const documentos = await this.service.obtenerDocumentosAgrupados(request.all(), payload.documento)
    return documentos
  }

  public async causas () {
    const causas = await this.service.obtenerCausas()
    return causas
  }

  public async actualizar ({ request, params}:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()    
    const factura:Factura = request.all();
    const {estado,boton} = params;
    const documentos = await this.service.actualizarFactura(estado,factura,payload.documento,boton, payload.idRol);
    return documentos
  }

  public async actualizarAgrupados ({ request, params}:HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()    
    const factura:Factura[] = Object.values(request.all());
    const {estado,boton} = params;
    const documentos = await this.service.actualizarFacturaAgrupados(estado,factura,payload.documento,boton, payload.idRol);
    return documentos
  }

  public async buscar ({ request}) {
    const payload = await request.obtenerPayloadJWT()
    const documentos = await this.service.buscarDocumentos(request.all(), payload.documento)
    return documentos
  }

  public async obtenerBusqueda ({ request}) {
    const payload = await request.obtenerPayloadJWT()
    const documentos = await this.service.obtenerBusqueda(request.all(), payload.documento)
    return documentos
  }

}
