import { Paginador } from "../../../Dominio/Paginador";
import { MapeadorPaginacionDB } from "./MapeadorPaginacionDB";
import { RepositorioArchivo } from "App/Dominio/Repositorios/RepositorioArchivo";
import { FacturaRPA } from "App/Dominio/Datos/Entidades/facturaRPA";
import { TblFacturaRPA } from "App/Infraestructura/Datos/Entidad/FacturaRPA";
import { RegistroRPA } from "App/Dominio/Datos/Entidades/registroRPA";
import { TblRegistroRPA } from "App/Infraestructura/Datos/Entidad/RegistroRPA";
import path from 'path';
import fs from 'fs';
import Env from '@ioc:Adonis/Core/Env';
import { TblSoporte } from "App/Infraestructura/Datos/Entidad/Soporte";
import Database from "@ioc:Adonis/Lucid/Database";
import { ServicioLogs } from "App/Dominio/Datos/Servicios/ServicioLogs";
const SMB2 = require('smb2');

export class RepositorioArchivosDB implements RepositorioArchivo {
  private servicioLogs = new ServicioLogs();

  async obtenerFacturas(params: any, documento: string): Promise<{ facturaRpa: FacturaRPA[]; paginacion: Paginador; }> {
    const {termino, pagina, limite } = params;
    const facturaRpa: FacturaRPA[] = [];
    /* let sql = TblFacturaRPA.query()
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
      } */
        let sql = Database.query()  // Asegúrate de usar Database.query() para iniciar el query builder
        .from('FacturaRPA as subquery')
        .select(
          'subquery.factura',
          Database.raw('MAX(subquery.cod_convenio) as cod_convenio'),
          Database.raw('MAX(subquery.estado) as estado'),
          Database.raw('MAX(subquery.ambito) as ambito'),
          Database.raw('MAX(subquery.descripcion_convenio) as descripcion_convenio'),
          Database.raw('MAX(subquery.vr_factura) as vr_factura'),
          Database.raw('MAX(subquery.fecha_facturacion) as fecha_facturacion'),
          Database.raw('MAX(subquery.documento_identificacion) as documento_identificacion'),
          Database.raw('MAX(subquery.nro_planilla) as nro_planilla'),
          Database.raw('MAX(subquery.fecha_formulario) as fecha_formulario'),
          Database.raw('MAX(subquery.id_factura) as id_factura'),
          Database.raw('MAX(subquery.tipo_factura) as tipo_factura')
        )
        .groupBy('subquery.factura');
    
      if (termino) {
        sql.andWhere((subquery) => {
          subquery.where('subquery.factura', 'LIKE', `%${termino}%`)
            .orWhereRaw('LOWER(subquery.estado) LIKE LOWER(?)', [`%${termino}%`])
            .orWhereRaw('LOWER(subquery.ambito) LIKE LOWER(?)', [`%${termino}%`])
            .orWhereRaw('LOWER(subquery.descripcion_convenio) LIKE LOWER(?)', [`%${termino}%`])
            .orWhereRaw('LOWER(subquery.cod_convenio) LIKE LOWER(?)', [`%${termino}%`])
            .orWhereRaw('LOWER(subquery.Documento_Identificacion) LIKE LOWER(?)', [`%${termino}%`])
            .orWhereRaw('LOWER(subquery.tipo_factura) LIKE LOWER(?)', [`%${termino}%`]);
        });
      }
    

      const facturasDB:any = await sql.paginate(pagina, limite);

      facturasDB.forEach((faturaDB) => {
        facturaRpa.push(faturaDB);
      });

      const paginacion = MapeadorPaginacionDB.obtenerPaginacion(facturasDB);
      return { facturaRpa, paginacion };
  }

  async obtenerRegistros(params: any, documento: string): Promise<{ registroRpa: RegistroRPA[]; paginacion: Paginador; }> {
    const { factura, pagina, limite} = params;
    const registroRpa: RegistroRPA[] = [];
    const sql = await TblRegistroRPA.query().where('factura',factura).orderBy('ID','desc').paginate(pagina, limite);

    sql.forEach((registroDB) => {
      registroRpa.push(registroDB);
      });

      const paginacion = MapeadorPaginacionDB.obtenerPaginacion(sql);
      return { registroRpa, paginacion };
  }

  async obtenerArchivo(nombre: string, factura:string, documento: string): Promise<any> {
    if (!nombre || !factura) {
        return {
            mensaje: `El nombre  y la factura son obligatorios`,
            error: 5
        }
    }
    
    //const relativePath = Env.get('BASEPATH');    
    const  rutaAbsoluta  = await this.crearCarpetaSiNoExiste(factura);

    const absolutePath = path.resolve(`${rutaAbsoluta}/${nombre}.pdf`);
    try {

        let archivo = fs.readFileSync(`${absolutePath}`, 'base64');
        this.servicioLogs.Archivo(factura,nombre,'Consultar',documento,'Exitoso')
        return { archivo }
    } catch (error) {
      console.log(error);
      this.servicioLogs.Archivo(factura,nombre,'Consultar',documento,'Fallo')
      
        return {
            mensaje: `No se encontro el archivo solicitado en la ruta: ${rutaAbsoluta}`,
            error: 6
        }

    }

}

async actualizarArchivo(archivo: any, nombre: string, factura:string, documento: string): Promise<any> {
  const nombreArchivoExistente = `${nombre}.pdf` 
  const  rutaAbsoluta  = await this.crearCarpetaSiNoExiste(factura);
  try {
    await archivo.move(rutaAbsoluta, { name: nombreArchivoExistente, overwrite: true })
    this.servicioLogs.Archivo(factura,nombre,'Actualizar',documento,'Exitoso')

    return {
      mensaje: `Archivo actualizado correctamente`
  }
  } catch (error) {
    this.servicioLogs.Archivo(factura,nombre,'Actualizar',documento,'Fallo')

    return {
      mensaje: `No se encontro el archivo solicitado en la ruta: ${rutaAbsoluta}`,
      error: 6
  }
    
  }

}

async eliminarArchivo(nombre: string, factura:string, documento: string, id:number): Promise<any> {
  if (!nombre || !factura) {
      return {
          mensaje: `El nombre  y la factura son obligatorios`,
          error: 5
      }
  }

  const carpeta = await this.obtenerNombreCarpeta(factura.trim())
  const raiz = `${Env.get('BASEPATH')}/${carpeta}/${nombre}.pdf`
  const absolutePath = path.resolve(`${raiz}`)
  

  const eliminarArchivo = (rutaArchivo) => {
    return new Promise((resolve, reject) => {
        fs.unlink(rutaArchivo, (err) => {
            if (err) {
                reject(`Error al eliminar el archivo en la carpeta: ${carpeta}`);
            } else {
                resolve('El archivo se ha eliminado correctamente.');
            }
        });
    });
  };

  try {
    const mensaje = await eliminarArchivo(absolutePath);
    await Database.rawQuery(`DELETE from HRBOTCES.dbo.RegistroRPA where Factura = '${factura}' and ID=${id} `);
    this.servicioLogs.Archivo(factura,nombre,'Eliminar',documento,'Exitoso')
    
    return {mensaje};
} catch (error) {
  this.servicioLogs.Archivo(factura,nombre,'Eliminar',documento,'Fallo')

    return error;
}

}

async guardarArchivo(archivo: any, tiposoporte: string, factura: string, documento:string): Promise<any> {
  const nombreArchivo = archivo.clientName; 
  const nombreSinExtension = nombreArchivo.split('.').slice(0, -1).join('.');
  
  const rutaAbsoluta = await this.crearCarpetaSiNoExiste(factura);
  try {
    await archivo.move(rutaAbsoluta, { overwrite: true });    
    await Database.rawQuery(`INSERT INTO HRBOTCES.dbo.RegistroRPA
    (hora_inicio, hora_fin, estado, nombre_pdf, Tipo_soporte, Factura,  type_process, usn_id) VALUES
    (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Procesado', '${nombreSinExtension}', '${tiposoporte}', '${factura}', 'USER', ${documento});
    `);

    
    this.servicioLogs.Archivo(factura,nombreSinExtension,'Guardar',documento,'Exitoso')

    return {
      mensaje: `Archivo '${nombreArchivo}' guardado correctamente`
    };
  } catch (error) {
    this.servicioLogs.Archivo(factura,nombreSinExtension,'Guardar',documento,'Fallo')

    throw new Error('Error al guardar el archivo');
  }
}

async obtenerSoportes(): Promise<any> {
  let soportes
  try {
  soportes = await TblSoporte.query().distinct('nombre_soporte')
   
  } catch (error) {
    console.log(error);
    throw new Error('Error ');
  }

  return {soportes}
}



crearCarpetaSiNoExiste = async (factura:string) => {
if(Env.get('LOCAL')== 1){
  const carpeta = await this.obtenerNombreCarpeta(factura.trim())

  const raiz = `${Env.get('BASEPATH')}/${carpeta}`
  console.log({raiz});
  
  const rutaAbsoluta = path.resolve(`${raiz}`)
  if (!fs.existsSync(rutaAbsoluta)) {
      fs.mkdirSync(rutaAbsoluta);
  }
  return rutaAbsoluta;

}else if(Env.get('LOCAL')== 0){

  const carpeta = await this.obtenerNombreCarpeta(factura.trim());
  
  const rutaAbsoluta = `${Env.get('BASEPATH')}\\${carpeta}`;

  // Configurar las opciones de conexión al servidor SMB remoto
  const options = {
    share: 'c$', // Nombre de la unidad compartida en el servidor remoto
  };

  try {
    // Crear una instancia del cliente SMB2
    const smbClient = new SMB2(options);

    // Verificar si la carpeta ya existe en el servidor remoto
    const existeCarpeta = await smbClient.exists(rutaAbsoluta);

    if (!existeCarpeta) {
      // Crear la carpeta en el servidor remoto si no existe
      await smbClient.mkdir(rutaAbsoluta);
    }

    // Cerrar la conexión al cliente SMB2
    smbClient.close();

    return rutaAbsoluta;
  } catch (error) {
    console.error('Error al crear la carpeta en el servidor remoto:', error);
    throw error; // Relanzar el error para manejarlo en un nivel superior si es necesario
  }

}

}


obtenerNombreCarpeta = async (factura:string) => {
  try {
    const carpeta = await Database.rawQuery(`
    select
	f.Factura,
	substring(f.Factura, 0,4) as alfa_num_factura,
	trim(substring(f.Factura, 5,1000)) as numero_factura,
	f.Convenio,
	f.Descripcion_Convenio,
	f.Rut,
	c.Aseguradora,
	f.Vr_Factura,
	f.Fecha_Facturacion,
	f.Documento_Identificacion,
	f.Nro_Planilla,
	f.Ambito,
	f.FEcha_Formulario,
	f.ID_Factura,
	f.Tipo_Factura,
	(CASE 
		when c.Aseguradora = 'EPS SURA' THEN concat('890982608_',substring(f.Factura, 0,5),'_',trim(substring(f.Factura, 5,1000)))
		when c.Aseguradora = 'MEDPLUS' THEN concat('890982608_',substring(f.Factura, 0,5),'_',trim(substring(f.Factura, 5,1000)),'_',f.Vr_Factura)
		ELSE concat(substring(f.Factura, 0,5),trim(substring(f.Factura, 5,1000)))		
	END	
	) as Ruta_Factura
	
from Factura f inner join Convenio c on (c.cod_convenio = f.Convenio) 
where
f.Factura = '${factura}'
    `)

    /* CASE 
		when c.Aseguradora = 'EPS SURA' THEN concat('890982608_',substring(f.Factura, 0,5),'_',trim(substring(f.Factura, 5,1000)),'_',f.Vr_Factura,'_PBS')
		when c.Aseguradora = 'EPS SURA NO PBS' THEN concat('890982608_',substring(f.Factura, 0,5),'_',trim(substring(f.Factura, 5,1000)),'_',f.Vr_Factura,'_NO PBS')
		when c.Aseguradora = 'MEDPLUS' THEN concat('890982608_',substring(f.Factura, 0,5),'_',trim(substring(f.Factura, 5,1000)),'_',f.Vr_Factura)
		ELSE concat(substring(f.Factura, 0,5),trim(substring(f.Factura, 5,1000)))
		
	END */
    
    return carpeta[0].Ruta_Factura;
    
  } catch (error) {
    throw new Error('No se pudo realizar la operacíon en este momento');
    
  }
}

}
