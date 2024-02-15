import { RepositorioDocumentos } from "App/Dominio/Repositorios/RepositorioDocumentos";

import { Paginador } from "../../../Dominio/Paginador";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { TblFacturacion } from "App/Infraestructura/Datos/Entidad/Facturacion";

export class RepositorioDocumentosDB implements RepositorioDocumentos {
  async obtenerDocumentos(params: any,documento:number): Promise<{}> {
    const { estado } = params;

const consulta = TblFacturacion.query()
let factura
factura = await consulta.where("estadoId", estado)
.first();

    if (!factura) {
      return "no hay documentos por analizar";
    }
    return factura;

    /* const rols: Rol[] = []    
    const rolesBD = await TblRoles.query().where('rol_root', false).orderBy('rol_nombre', 'desc').paginate(params.pagina, params.limite)
    rolesBD.forEach(rolesBD => {
      rols.push(rolesBD.obtenerRol())
    })
    const paginacion = MapeadorPaginacionDB.obtenerPaginacion(rolesBD)
    return {rols , paginacion} */
  }
}
