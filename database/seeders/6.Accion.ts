import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { TblAcciones } from "App/Infraestructura/Datos/Entidad/Acciones";

export default class extends BaseSeeder {
  public async run() {
    await TblAcciones.createMany([
      {
        id: 1,
        accion: "Analizar información, boton : Escalar para gestión",
      },
      {
        id: 2,
        accion: "Analizar información, boton : Marcar para crear factura",
      },
      {
        id: 3,
        accion: "Analizar información, boton : Eliminar - Rechazar",
      },
      {
        id: 4,
        accion: "Escalar para gestión, boton : Crear Factura",
      },
      {
        id: 5,
        accion: "Escalar para gestión, boton : Devolver a Analizar",
      },
      {
        id: 6,
        accion: "Escalar para gestión, boton : Eliminar - Rechazar",
      },
      {
        id: 7,
        accion: "Marcar prestación, boton :  Crear Factura",
      },
      {
        id: 8,
        accion: "Marcar prestación, boton : Devolver a Analizar",
      },
      {
        id: 9,
        accion: "Marcar prestación, boton : Eliminar - Rechazar",
      },
    ]);
  }
}
