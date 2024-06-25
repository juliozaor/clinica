import { RepositorioDocumentos } from "App/Dominio/Repositorios/RepositorioDocumentos";

import Database from "@ioc:Adonis/Lucid/Database";
import { ConsultasDB } from "App/Infraestructura/Servicios/Consultas";
import { Factura } from "App/Dominio/Datos/Entidades/factura";
import { DateTime } from "luxon";
import { ServicioActualizacion } from "App/Infraestructura/Servicios/Actualizar";
import { ServicioLogs } from "App/Dominio/Datos/Servicios/ServicioLogs";
import { TblCausas } from "App/Infraestructura/Datos/Entidad/Causas";
import { Paginador } from "App/Dominio/Paginador";
import { TblFacturacion } from "App/Infraestructura/Datos/Entidad/Facturacion";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { TblEstados } from "App/Infraestructura/Datos/Entidad/Estados";

export class RepositorioDocumentosDB implements RepositorioDocumentos {
  private servicioActualizacion = new ServicioActualizacion();
  private servicioLogs = new ServicioLogs();
  async obtenerDocumentos(params: any, documento: number): Promise<{}> {
    const { estado = 2, parametro } = params;
    let factura;
    factura = await this.consultarFactura(estado, documento, parametro);

    const servicioConsultas = new ConsultasDB();
    if (!factura) {
      const sql = servicioConsultas.actualizarAnalizar(documento, parametro);
      try {
        await Database.rawQuery(sql);
      } catch (error) {
        console.log(error);

        throw new Error("Error al ejecutar la consulta SQL");
      }

      //Realizar nuevamente la consulta inicial
      factura = await this.consultarFactura(estado, documento, parametro);

      if (!factura) {
        return "No hay facturas disponibles para este proceso";
      }
    }

    const sqlDetalles = servicioConsultas.consultardetalles(
      factura.RPA_FOR_NUMERFORMU
    );
    const detalles = await Database.rawQuery(sqlDetalles);
    factura.detalles = detalles;
    const fechaDigit = factura.RPA_FOR_FECHADIGIT;
    const fechaTencion = factura.RPA_FOR_FECHATENCION;

    const fechaFormateadaDigit = fechaDigit?.toISOString().slice(0, 16);
    const fechaFormateadaTencion = fechaTencion?.toISOString().slice(0, 16);

    factura.RPA_FOR_FECHADIGIT = fechaFormateadaDigit;
    factura.RPA_FOR_FECHATENCION = fechaFormateadaTencion;

    return factura;
  }

  consultarFactura = async (
    estado: number,
    documento: number,
    parametro: string
  ) => {
    const servicioConsultas = new ConsultasDB();
    const sql = servicioConsultas.consultarFormulario(
      documento,
      parametro,
      estado
    );

    try {
      const f = await Database.rawQuery(sql);
      return f[0];
    } catch (error) {
      console.log(error);

      throw new Error("Error al ejecutar la consulta SQL");
    }
  };

  async actualizarFactura(
    estado: number,
    factura: Factura,
    documento: string,
    boton: number,
    rol: string
  ): Promise<{}> {
    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    const datos = this.servicioActualizacion.obtenerKeys(boton);

    try {
      factura.estadoId = estado;
      factura.fultestado = fechaActual;
      factura[datos.fechaUsuario] = fechaActual;
      factura[datos.usuario] = documento;

      if (factura.RPA_FOR_FECHADIGIT) {
        factura.RPA_FOR_FECHADIGIT = await this.formatearfecha(
          factura.RPA_FOR_FECHADIGIT
        );
      }
      if (factura.RPA_FOR_FECHATENCION) {
        factura.RPA_FOR_FECHATENCION = await this.formatearfecha(
          factura.RPA_FOR_FECHATENCION
        );
      }

      delete factura.estado_id;

      await Database.from("BOTF_FACTURACION")
        .where("RPA_FOR_NUMERFORMU", factura.RPA_FOR_NUMERFORMU!)
        .update(factura);

      this.servicioLogs.Forms(
        documento,
        rol,
        factura.RPA_FOR_NUMERFORMU!,
        boton,
        estado
      );

      return true;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async obtenerCausas(): Promise<{}> {
    return await TblCausas.query();
  }

  formatearfecha = (fecha: string): string => {
    const date = new Date(fecha);

    // Obtener los componentes de la fecha (año, mes, día, hora, minutos)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Agregar ceros a la izquierda si es necesario
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  };

  async obtenerDocumentosAgrupados(
    params: any,
    documento: number
  ): Promise<{}> {
    const { estado = 2, parametro } = params;
    let formularios;
    formularios = await this.consultarFacturaAgrupada(
      estado,
      documento,
      parametro
    );

    const servicioConsultas = new ConsultasDB();
    if (formularios.length <= 0) {
      const sql = servicioConsultas.actualizarAgrupada(documento, parametro);
      try {
        await Database.rawQuery(sql);
      } catch (error) {
        console.log(error);

        throw new Error("Error al ejecutar la consulta SQL");
      }

      //Realizar nuevamente la consulta inicial
      formularios = await this.consultarFacturaAgrupada(
        estado,
        documento,
        parametro
      );

      if (formularios.length <= 0) {
        return "No hay facturas disponibles para este proceso";
      }
    }

    for await (const formulario of formularios) {

      const sqlDetalles = servicioConsultas.consultardetalles(
        formulario.RPA_FOR_NUMERFORMU
      );
      const detalles = await Database.rawQuery(sqlDetalles);
      formulario.detalles = detalles;
      const fechaDigit = formulario.RPA_FOR_FECHADIGIT;
      const fechaTencion = formulario.RPA_FOR_FECHATENCION;

      const fechaFormateadaDigit = fechaDigit?.toISOString().slice(0, 16);
      const fechaFormateadaTencion = fechaTencion?.toISOString().slice(0, 16);

      formulario.RPA_FOR_FECHADIGIT = fechaFormateadaDigit;
      formulario.RPA_FOR_FECHATENCION = fechaFormateadaTencion;
    }

    return formularios;
  }

  consultarFacturaAgrupada = async (
    estado: number,
    documento: number,
    parametro: string
  ) => {
    const servicioConsultas = new ConsultasDB();
    const sql = servicioConsultas.consultarFormularioAgrupado(
      documento,
      parametro,
      estado
    );

    try {
      const f = await Database.rawQuery(sql);
      return f;
    } catch (error) {
      console.log(error);

      throw new Error("Error al ejecutar la consulta SQL");
    }
  };

  async actualizarFacturaAgrupados(
    estado: number,
    facturas: Factura[],
    documento: string,
    boton: number,
    rol: string
  ): Promise<{}> {
    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    const datos = this.servicioActualizacion.obtenerKeys(boton);

    for await (const factura of facturas) {
      try {
        factura.estadoId = estado;
        factura.fultestado = fechaActual;
        factura[datos.fechaUsuario] = fechaActual;
        factura[datos.usuario] = documento;
  
        if (factura.RPA_FOR_FECHADIGIT) {
          factura.RPA_FOR_FECHADIGIT = this.formatearfecha(
            factura.RPA_FOR_FECHADIGIT
          );
        }
        if (factura.RPA_FOR_FECHATENCION) {
          factura.RPA_FOR_FECHATENCION = this.formatearfecha(
            factura.RPA_FOR_FECHATENCION
          );
        }
        delete factura.estado_id;
        delete factura.detalles;
        delete factura.pausar;
        delete factura.procesar;        
  
        await Database.from("BOTF_FACTURACION")
          .where("RPA_FOR_NUMERFORMU", factura.RPA_FOR_NUMERFORMU!)
          .update(factura);
          
  
        this.servicioLogs.Forms(
          documento,
          rol,
          factura.RPA_FOR_NUMERFORMU!,
          boton,
          estado
        );
  
        //return true;
      } catch (error) {
        console.log(error);  
        return error;
      }
      
    }
    console.log({mensaje:"Se actualizo correctamente"})
    return {mensaje:"Se actualizo correctamente"}
    
  }

  async buscarDocumentos(param: any, documento: number): Promise<{ formularios: Factura[]; paginacion: Paginador; }> {
    const formularios: Factura[] = [];
    const { termino, pagina, limite, estadoId} = param;

    const sql = TblFacturacion.query().preload('estado');
    if (termino) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(RUT_PAC) LIKE LOWER(?)", [`%${termino}%`]);
        subquery.orWhereRaw("LOWER(RPA_FOR_NUMERFORMU) LIKE LOWER(?)", [`%${termino}%`]);
      });
/* 
      const estados = await TblEstados.query().whereRaw("LOWER(nombre) LIKE LOWER(?)", [`%${termino}%`]);
      const estadoIds = estados.map((estado) => estado.id);
          
      if (estadoIds.length > 0) {        
        sql.orWhereIn('estadoId', estadoIds);
      }    */  

    }
    sql.whereIn('estadoId', [0,2,10]);

    if (estadoId) {      
      sql.where('estadoId', estadoId);
    }


    


    const formulariosDB = await sql.orderBy("NOM_PAC", "asc").paginate(pagina, limite);
    formulariosDB.forEach(formularioDB => {
      formularios.push(formularioDB.obtenerFormulario())
    })

    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(formulariosDB)
    return {formularios , paginacion}
  }

  async obtenerBusqueda(
    params: any
  ): Promise<{formularios: Factura[], tipo:string, estado:number}> {
    const { formularioId, rut } = params;
    let formularios;
    let tipo = 'INDIVIDUAL';
    const servicioConsultas = new ConsultasDB();
    let sql = servicioConsultas.consultarFormularioBusqueda(tipo, formularioId, rut );

    try {
      formularios = await Database.rawQuery(sql);
      if (formularios.length <= 0) {
        tipo = 'AGRUPADO' 
        sql = servicioConsultas.consultarFormularioBusqueda(tipo, formularioId, rut );
        formularios = await Database.rawQuery(sql);
        if (formularios.length <= 0) {
          return {formularios, tipo, estado: 0};
        }
      }

       if(tipo === 'INDIVIDUAL'){
        
        if(formularios[0].uanalizarinfo){
          return {formularios, tipo, estado: 3};       
        }  

        const estado = await TblEstados.findOrFail(formularios[0].estadoId);
        formularios[0].nombreEstado = estado.nombre;

        const sqlDetalles = servicioConsultas.consultardetalles(
          formularios[0].RPA_FOR_NUMERFORMU
        );
        const detalles = await Database.rawQuery(sqlDetalles);
        formularios[0].detalles = detalles;
        const fechaDigit = formularios[0].RPA_FOR_FECHADIGIT;
        const fechaTencion = formularios[0].RPA_FOR_FECHATENCION;
    
        const fechaFormateadaDigit = fechaDigit?.toISOString().slice(0, 16);
        const fechaFormateadaTencion = fechaTencion?.toISOString().slice(0, 16);
    
        formularios[0].RPA_FOR_FECHADIGIT = fechaFormateadaDigit;
        formularios[0].RPA_FOR_FECHATENCION = fechaFormateadaTencion;
       }

       if(tipo === 'AGRUPADO'){

        if(formularios[0].uanalizarinfo){
          return {formularios, tipo, estado: 3};       
        }  

        for await (const formulario of formularios) {

          const estado = await TblEstados.findOrFail(formulario.estadoId);
          formulario.nombreEstado = estado.nombre;
          

          const sqlDetalles = servicioConsultas.consultardetalles(
            formulario.RPA_FOR_NUMERFORMU
          );
          const detalles = await Database.rawQuery(sqlDetalles);
          formulario.detalles = detalles;
          const fechaDigit = formulario.RPA_FOR_FECHADIGIT;
          const fechaTencion = formulario.RPA_FOR_FECHATENCION;
    
          const fechaFormateadaDigit = fechaDigit?.toISOString().slice(0, 16);
          const fechaFormateadaTencion = fechaTencion?.toISOString().slice(0, 16);
    
          formulario.RPA_FOR_FECHADIGIT = fechaFormateadaDigit;
          formulario.RPA_FOR_FECHATENCION = fechaFormateadaTencion;
        }
       }

      return {formularios, tipo, estado: 1};


    } catch (error) {
      console.log(error);

      throw new Error("Error al ejecutar la consulta SQL");
    }

      

    
  }
}
