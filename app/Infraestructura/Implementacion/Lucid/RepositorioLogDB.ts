import { Paginador } from "../../../Dominio/Paginador";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { LogLogin } from "App/Dominio/Datos/Entidades/LogLogin";
import { RepositorioLogs } from "App/Dominio/Repositorios/RepositorioLogs";
import { TblLogsLogins } from "App/Infraestructura/Datos/Entidad/LogsLogin";
import { TblLogsForms } from "App/Infraestructura/Datos/Entidad/LogsForms";
import { TblLogsRobots } from "App/Infraestructura/Datos/Entidad/LogsRobot";
import { TblLogsOracles } from "App/Infraestructura/Datos/Entidad/LogsOracle";
import { TblFacturacion } from "App/Infraestructura/Datos/Entidad/Facturacion";
import { TblLogsArchivos } from "App/Infraestructura/Datos/Entidad/LogsArchivo";

export class RepositorioLogDB implements RepositorioLogs {
  async obtenerLogsLogin(
    params: any
  ): Promise<{ logs: LogLogin[]; paginacion: Paginador }> {
    const { tipo, termino, pagina, limite, estado } = params;
    const logs: LogLogin[] = [];
    let sql: any;
    if (tipo == 1) {
      sql = TblLogsLogins.query().orderBy("id", "desc");
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("usuario", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(estado_login) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(mensaje_error) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
        });
      }
    }
    if (tipo == 2) {
      sql = TblLogsForms.query().preload("accion").orderBy("id", "desc");
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("usuario", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(rol) LIKE LOWER(?)", [`%${termino}%`]);
          subquery.orWhereRaw("LOWER(rpa_for_numerformu) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(estado) LIKE LOWER(?)", [`%${termino}%`]);
        });
      }
    }
    if (tipo == 3) {
      sql = TblLogsRobots.query().orderBy("id", "desc");
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("descripcion", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(rpa_for_numerformu) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(estado) LIKE LOWER(?)", [`%${termino}%`]);
        });
      }
    }
    if (tipo == 4) {
      sql = TblLogsOracles.query().orderBy("id", "desc");
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("accion", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(estado) LIKE LOWER(?)", [`%${termino}%`]);
        });
      }
    }
    if (tipo == 5) {
      sql = TblFacturacion.query()
        .preload("estado")

        .orderBy("RPA_FOR_NUMERFORMU", "desc");

      if (estado && estado != 0 ) {
        
        sql.whereIn("estadoId", [estado]);
      } else {
        sql.whereIn("estadoId", [-1, 8, 9]);
      }
      
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("CONVENIO", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(RPA_FOR_NUMERFORMU) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(COD_CONVENIO) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(AMBITO) LIKE LOWER(?)", [`%${termino}%`]);
        });
      }
    }if (tipo == 6) {
      sql = TblLogsArchivos.query().orderBy("id", "desc");
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("accion", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(estado) LIKE LOWER(?)", [`%${termino}%`]);
          subquery.orWhereRaw("LOWER(archivo) LIKE LOWER(?)", [`%${termino}%`]);
          subquery.orWhereRaw("LOWER(factura) LIKE LOWER(?)", [`%${termino}%`]);
          subquery.orWhereRaw("LOWER(usuario) LIKE LOWER(?)", [`%${termino}%`]);
        });
      }
    }

    const logDB = await sql.paginate(pagina, limite);

    logDB.forEach((logDB) => {
      logs.push(logDB);
    });

    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(logDB);
    return { logs, paginacion };
  }
}
