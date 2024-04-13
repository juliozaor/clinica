/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { ROBOT } from "App/Dominio/Datos/Entidades/robot";
import { ServicioLogs } from "App/Dominio/Datos/Servicios/ServicioLogs";
import { ConsultasDB } from "App/Infraestructura/Servicios/Consultas";

export default class ControladorDocumentos {
  private consultas: ConsultasDB;
  private servicioLogs = new ServicioLogs();
  constructor() {
    this.consultas = new ConsultasDB();
  }

  public async obtener({ response }:HttpContextContract) {

    const sql = this.consultas.obtenerFactura();

    try {
      const factura = await Database.rawQuery(sql);
      if (!factura) {
        return response.notFound({mensaje:"No se encontraron formularios"})
      }

      if (factura.length >= 1) {
        
        const sql2 = this.consultas.actualizarRobotConsulta(
          factura[0].RPA_FOR_NUMERFORMU
        );
        try {
          await Database.rawQuery(sql2);
        } catch (error2) {
          console.log(error2);
        }

        const facturaR:ROBOT = factura[0];
        const detalles=new Array();
        factura.forEach((f) => {
          detalles.push({
            ATE_PRE_CODIGO: f.ATE_PRE_CODIGO,
            PRE_PRE_DESCRIPCIO: f.PRE_PRE_DESCRIPCIO,
            PRE_TIP_DESCRIPCIO: f.PRE_TIP_DESCRIPCIO,
            TIPO_FORMULARIO: f.TIPO_FORMULARIO
          });
        });
        facturaR.DETALLES = detalles
        return response.status(200).send(facturaR);
      }else{
        return response.notFound({mensaje:"No se encontraron formularios"})
      }

    } catch (error) {
      console.log(error);
      
      return response.serviceUnavailable({ error: 'Error al consultar las formularios' })
    }
  }

  public async actualizar({ request, response }:HttpContextContract) {
    const { rpaForNumerformu, estadoId, descripcion, nfactura } = request.all();
    const sql = this.consultas.actualizarRobotRespuesta(
      rpaForNumerformu,
      estadoId,
      descripcion,
      nfactura
    );
    try {
      await Database.rawQuery(sql);
      this.servicioLogs.Robot(rpaForNumerformu,descripcion,estadoId);
      return response.accepted({mensaje:"Respuesta enviada correctamente"});
    } catch (error2) {
      return response.serviceUnavailable({ error: 'Error al ejecutar la consulta SQL' })
    }
  }

  public async actualizarAgrupados({ request, response }:HttpContextContract) {
    const facturas = request.all();

    const facturasArray = Object.values(facturas);

for (const factura of facturasArray) {
  const { rpaForNumerformu, estadoId, descripcion, nfactura } = factura;
  const sql = this.consultas.actualizarRobotRespuesta(
    rpaForNumerformu,
    estadoId,
    descripcion,
    nfactura
  );
  try {
    await Database.rawQuery(sql);
    this.servicioLogs.Robot(rpaForNumerformu,descripcion,estadoId);
  } catch (error2) {
    return response.serviceUnavailable({ error: 'Error al ejecutar la consulta SQL' })
  }
}

    return response.accepted({mensaje:"Respuesta enviada correctamente"});
    
  }

  public async obtenerAgrupadas({ response }:HttpContextContract) {

    const sql = this.consultas.obtenerFacturaAgrupadas();
    
    try {
      const formularios = await Database.rawQuery(sql);
      if (formularios.length <= 0) {
        return response.notFound({mensaje:"No se encontraron formularios"})
      }

for await (const factura of formularios) {
  
  const sql2 = this.consultas.actualizarRobotConsulta(
    factura.RPA_FOR_NUMERFORMU
  );
  try {
    await Database.rawQuery(sql2);
  } catch (error2) {
    console.log(error2);
  }
/* 
  const facturaR:ROBOT = factura[0];
  const detalles=new Array();
  factura.forEach((f) => {
    detalles.push({
      ATE_PRE_CODIGO: f.ATE_PRE_CODIGO,
      PRE_PRE_DESCRIPCIO: f.PRE_PRE_DESCRIPCIO,
      PRE_TIP_DESCRIPCIO: f.PRE_TIP_DESCRIPCIO,
      TIPO_FORMULARIO: f.TIPO_FORMULARIO
    });
  });
  facturaR.DETALLES = detalles
  return response.status(200).send(facturaR); */
}

return formularios

        

    } catch (error) {
      console.log(error);
      
      return response.serviceUnavailable({ error: 'Error al consultar las formularios' })
    }
  }

}