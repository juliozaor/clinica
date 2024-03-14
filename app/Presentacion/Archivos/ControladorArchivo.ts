import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioArchivo } from 'App/Dominio/Datos/Servicios/ServicioArchivo'
import { RepositorioArchivosDB } from 'App/Infraestructura/Implementacion/Lucid/RepositorioArchivosDB'

export default class ControladorReporte {

  private service: ServicioArchivo
  constructor () {
    this.service = new ServicioArchivo(new RepositorioArchivosDB())
  }

  public async facturas ({ request, response }: HttpContextContract){
    const facturas = await this.service.obtenerFacturas(request.all())
    return facturas
  }
  public async registros ({request, response }: HttpContextContract){
    const registros = await this.service.obtenerRegistros(request.all());
    return registros
  }
  public async abrir ({request, response }: HttpContextContract){
    const {nombre, factura} = request.all();
    return this.service.obtenerArchivo(nombre, factura)
  }
 public async actualizar ({request, response }: HttpContextContract){
  const {nombre, factura} = request.all();

    const archivo = request.file('archivo', {
      extnames: ['pdf'],
    })
  
    if (!archivo) {
      return response.status(400).send('No se ha proporcionado ningún archivo.')
    }
    return this.service.actualizarArchivo(archivo, nombre, factura)

  }

public async eliminar ({request, response }: HttpContextContract){
  const {nombre, factura} = request.all();
  return this.service.eliminarArchivo(nombre, factura)
  }
 /* public async crear ({request, response }: HttpContextContract){

  }
   */



}
