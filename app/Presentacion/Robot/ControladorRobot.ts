/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { ConsultasDB } from "App/Infraestructura/Servicios/Consultas";

export default class ControladorDocumentos {
  private consultas: ConsultasDB;
  constructor() {
    this.consultas = new ConsultasDB();
  }

  public async obtener() {
    const sql = this.consultas.obtenerFactura();
    try {
      const factura = await Database.rawQuery(sql);
      if (factura) {
        const sql2 = this.consultas.actualizarRobotConsulta(
          factura[0].RPA_FOR_NUMERFORMU
        );
        try {
          await Database.rawQuery(sql2);
        } catch (error2) {
          console.log(error2);
        }
      }
      return factura[0];
    } catch (error) {
      throw new Error("Error al ejecutar la consulta SQL");
    }
  }

  public async actualizar({ request, response }) {
    const {rpaForNumerformu, estadoId, descripcion} = request.all();
    const sql = this.consultas.actualizarRobotRespuesta(rpaForNumerformu,estadoId,descripcion);
    try {
      await Database.rawQuery(sql);
      return response.status(400).send('Respuesta enviada correctamente');
    } catch (error2) {
      throw new Error("Error al ejecutar la consulta SQL");
    }
  }
}
