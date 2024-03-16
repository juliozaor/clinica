import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ServicioArchivo } from "App/Dominio/Datos/Servicios/ServicioArchivo";
import { RepositorioArchivosDB } from "App/Infraestructura/Implementacion/Lucid/RepositorioArchivosDB";

export default class ControladorReporte {
  private service: ServicioArchivo;
  constructor() {
    this.service = new ServicioArchivo(new RepositorioArchivosDB());
  }

  public async facturas({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const facturas = await this.service.obtenerFacturas(request.all(), payload.documento);
    return facturas;
  }
  public async registros({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const registros = await this.service.obtenerRegistros(request.all(), payload.documento);
    return registros;
  }
  public async abrir({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const { nombre, factura } = request.all();
    return this.service.obtenerArchivo(nombre, factura, payload.documento);
  }
  public async actualizar({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const { nombre, factura } = request.all();

    const archivo = request.file("archivo", {
      extnames: ["pdf"],
    });

    if (!archivo) {
      return response
        .status(400)
        .send({ mensaje: "No se ha proporcionado ningún archivo válido." });
    }
    return this.service.actualizarArchivo(archivo, nombre, factura, payload.documento);
  }

  public async eliminar({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const { nombre, factura, id } = request.all();
    return this.service.eliminarArchivo(nombre, factura, payload.documento, id);
  }

  public async crear({ request, response }: HttpContextContract) {
    const payload = await request.obtenerPayloadJWT()
    const { factura, tiposoporte } = request.all();

    const archivo = request.file("archivo", {
      extnames: ["pdf"],
    });

    if (!archivo) {
      return response
        .status(400)
        .send({ mensaje: "No se ha proporcionado ningún archivo válido." });
    }
    return this.service.guardarArchivo(archivo, tiposoporte, factura, payload.documento);
  }

  public async soportes() {
    return this.service.obtenerSoportes();
  }
}
