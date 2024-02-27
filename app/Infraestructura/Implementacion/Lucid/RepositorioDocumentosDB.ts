import { RepositorioDocumentos } from "App/Dominio/Repositorios/RepositorioDocumentos";

import { TblFacturacion } from "App/Infraestructura/Datos/Entidad/Facturacion";
import Database from "@ioc:Adonis/Lucid/Database";
import { ConsultasDB } from "App/Infraestructura/Servicios/Consultas";
import { Factura } from "App/Dominio/Datos/Entidades/factura";
import { DateTime } from "luxon";
import { ServicioActualizacion } from "App/Infraestructura/Servicios/Actualizar";

export class RepositorioDocumentosDB implements RepositorioDocumentos {
  private servicioActualizacion = new ServicioActualizacion();
  async obtenerDocumentos(params: any, documento: number): Promise<{}> {
    const { estado } = params;
    let factura;
    let usuario: string;

    switch (estado) {
      case '2':
        usuario = "uanalizarinfo";
        break;
      case '3':
        usuario = "uescalargestion";
        break;
      default:
        usuario = "umarcarprestacion";
        break;
    }

    factura = await this.consultarFactura(estado, usuario, documento);   
    

    if (!factura) {
      
        const servicioConsultas = new ConsultasDB();
        let sql ='';
        switch (estado) {
          case '2':
            sql =servicioConsultas.actualizarAnalizar(documento);           
            break;
          case '3':
            sql =servicioConsultas.actualizarGestionar(documento);
            break;
          default:
            sql =servicioConsultas.actualizarValidar(documento);
            break;
        }
        try {
          await Database.rawQuery(sql);
        } catch (error) {
          throw new Error('Error al ejecutar la consulta SQL');
        }

      //Relaizar nuevamente la consulta inicial
      factura = await this.consultarFactura(estado, usuario, documento);

      if (!factura) {
        return "No hay facturas disponibles para este proceso";
      }
    }
    const fechaDigit = factura.RPA_FOR_FECHADIGIT;
    const fechaTencion = factura.RPA_FOR_FECHATENCION;

    
    const fechaFormateadaDigit = fechaDigit.toISOString().slice(0, 16);
    const fechaFormateadaTencion = fechaTencion.toISOString().slice(0, 16);    

    factura.RPA_FOR_FECHADIGIT = fechaFormateadaDigit
    factura.RPA_FOR_FECHATENCION = fechaFormateadaTencion

    
    
    return factura;
  }

  consultarFactura = async (
    estado: number,
    usuario: string,
    documento: number
  ) => {
    return await TblFacturacion.query().preload('detalles')
      .where("estadoId", estado)
      .andWhere(usuario, documento)
      .first();
  };


 async actualizarFactura(estado: number, factura: Factura, documento:number, boton:number): Promise<{}> {
  const fechaActual = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss.SSS');
  const datos = this.servicioActualizacion.obtenerKeys(boton);  

  try { 
      factura.estadoId =estado;
      factura.fultestado = fechaActual;
      factura[datos.fechaUsuario] = fechaActual;
      factura[datos.usuario] = documento;

      factura.rpa_for_fechadigit = await this.formatearfecha(factura.rpa_for_fechadigit!);
      factura.rpa_for_fechatencion = await this.formatearfecha(factura.rpa_for_fechatencion!);
     

      delete factura.estado_id
      
      await Database.from('BOTF_FACTURACION')
      .where('RPA_FOR_NUMERFORMU', factura.rpa_for_numerformu!)
      .update(factura);

      return true
  } catch (error) {
    console.log(error);
    
    return error
    
  }
 }

 formatearfecha = (fecha:string): string =>{
  const date = new Date(fecha);

  // Obtener los componentes de la fecha (año, mes, día, hora, minutos)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
 }
}
