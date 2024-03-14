import { Paginador } from "../../../Dominio/Paginador";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { RepositorioArchivo } from "App/Dominio/Repositorios/RepositorioArchivo";
import { FacturaRPA } from "App/Dominio/Datos/Entidades/facturaRPA";
import { TblFacturaRPA } from "App/Infraestructura/Datos/Entidad/FacturaRPA";
import { RegistroRPA } from "App/Dominio/Datos/Entidades/registroRPA";
import { TblRegistroRPA } from "App/Infraestructura/Datos/Entidad/RegistroRPA";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import path from 'path';
import fs from 'fs';
import Env from '@ioc:Adonis/Core/Env';

export class RepositorioArchivosDB implements RepositorioArchivo {


  async obtenerFacturas(params: any): Promise<{ facturaRpa: FacturaRPA[]; paginacion: Paginador; }> {
    const {termino, pagina, limite } = params;
    const facturaRpa: FacturaRPA[] = [];
    let sql = TblFacturaRPA.query()
        .orderBy("ID_Factura", "desc");      
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where("Factura", "LIKE", `%${termino}%`);
          subquery.orWhereRaw("LOWER(Estado) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(Ambito) LIKE LOWER(?)", [
            `%${termino}%`,
          ]);
          subquery.orWhereRaw("LOWER(Descripcion_Convenio) LIKE LOWER(?)", [`%${termino}%`]);
          subquery.orWhereRaw("LOWER(cod_convenio) LIKE LOWER(?)", [`%${termino}%`]);
          subquery.orWhereRaw("LOWER(Tipo_Factura) LIKE LOWER(?)", [`%${termino}%`]);
        });
      }

      const facturasDB = await sql.paginate(pagina, limite);

      facturasDB.forEach((faturaDB) => {
        facturaRpa.push(faturaDB);
      });

      const paginacion = MapeadorPaginacionDB.obtenerPaginacion(facturasDB);
      return { facturaRpa, paginacion };
  }

  async obtenerRegistros(params: any): Promise<{ registroRpa: RegistroRPA[]; paginacion: Paginador; }> {
    const { factura, pagina, limite} = params;
    const registroRpa: RegistroRPA[] = [];
    const sql = await TblRegistroRPA.query().where('factura',factura).orderBy('ID','desc').paginate(pagina, limite);

    sql.forEach((registroDB) => {
      registroRpa.push(registroDB);
      });

      const paginacion = MapeadorPaginacionDB.obtenerPaginacion(sql);
      return { registroRpa, paginacion };
  }

  async obtenerArchivo(nombre: string, factura:string): Promise<any> {
    if (!nombre || !factura) {
        return {
            mensaje: `El nombre  y la factura son obligatorios`,
            error: 5
        }
    }
    
    const relativePath = Env.get('BASEPATH');    

    try {
        const absolutePath = path.resolve(`${relativePath}/${factura}/${nombre}.pdf`);

        let archivo = fs.readFileSync(`${absolutePath}`, 'base64');
        return { archivo }
    } catch (error) {
      console.log(error);
      
        return {
            mensaje: `No se encontro el archivo solicitado`,
            error: 6
        }

    }

}

async actualizarArchivo(archivo: any, nombre: string, factura:string): Promise<any> {
  const nombreArchivoExistente = `${nombre}.pdf` 
  const  rutaAbsoluta  = await this.crearCarpetaSiNoExiste(factura);
  try {
    await archivo.move(rutaAbsoluta, { name: nombreArchivoExistente, overwrite: true })
    return {
      mensaje: `Archivo actualizado correctamente`
  }
  } catch (error) {
    console.log(error);
    
  }

}

async eliminarArchivo(nombre: string, factura:string): Promise<any> {
  if (!nombre || !factura) {
      return {
          mensaje: `El nombre  y la factura son obligatorios`,
          error: 5
      }
  }
  
  const relativePath = Env.get('BASEPATH');    
  const absolutePath = path.resolve(`${relativePath}/${factura}/${nombre}.pdf`);

  const eliminarArchivo = (rutaArchivo) => {
    return new Promise((resolve, reject) => {
        fs.unlink(rutaArchivo, (err) => {
            if (err) {
                reject(`Error al eliminar el archivo: ${err.message}`);
            } else {
                resolve('El archivo se ha eliminado correctamente.');
            }
        });
    });
  };

  try {
    const mensaje = await eliminarArchivo(absolutePath);
    console.log(mensaje);
    return {mensaje};
} catch (error) {
    console.error(error);
    return error;
}

}



crearCarpetaSiNoExiste = async (factura) => {
  const raiz = `${Env.get('BASEPATH')}/${factura}`
  const rutaAbsoluta = path.resolve(`${raiz}`)
  if (!fs.existsSync(rutaAbsoluta)) {
      fs.mkdirSync(rutaAbsoluta);
  }
  return rutaAbsoluta;
}

}
