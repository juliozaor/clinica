
import Env from "@ioc:Adonis/Core/Env";
const oracledb = require("oracledb");
import fs from "fs";
import path from "path";
const consultarOracleEInsertarMSSQL = async (tipo: number) => {

  let connection;
  const tnsAdminPath = path.join(__dirname, "tns");
  process.env.TNS_ADMIN = tnsAdminPath;


  try {
    await oracledb.initOracleClient();

    connection = await oracledb.getConnection({
      connectString: "PRUEBAS", // Nombre del alias de servicio en tnsnames.ora
      user: 'ADMCES',
      password: 'S*STE#AS2021',
    });

    console.log("Conexión establecida con Oracle Database");
  } catch (error) {
    console.log("Fallo conexion con Oracle Database", error);
    
    return { estado: 1, error };
  }

  let consulta: string;
  try {
    const tipoConsulta = tipo == 1 ? "ora_facturas.sql" : "ora_detalle.sql";

    const rutaArchivo = path.resolve(__dirname, tipoConsulta);
    consulta = fs.readFileSync(rutaArchivo, "utf-8");
  } catch (error) {
    return { estado: 2, error };
  }

  let datosOracle;
  try {
    console.log('Ejecutando consulta Oracle: ', consulta );
    
    datosOracle = await connection.execute(consulta, [], {
      outFormat: oracledb.OBJECT,
    });

    console.log('Insertando datos en tabla temporal Sql Server');
    
    if(datosOracle?.rows.length > 0){
      
      if(tipo == 1){
        await almacenarFacturas(datosOracle?.rows)
      }    
      if(tipo == 2){
        await almacenarDetalles(datosOracle?.rows)
      }        
    }

    console.log('Distribución de datos terminada en Sql Server');

    await connection.close();

    

    return true;
  } catch (error) {
   // console.log(error);

    await connection.close();
  }
};

const almacenarFacturas = async (datosOracle: []) => {
  console.log("Almacenar Factura");
  const Database = (await import("@ioc:Adonis/Lucid/Database")).default;
  const TblFacturacion = (await import("../Datos/Entidad/Facturacion"));


  //1. Truncar la tabla BOTF_TMP_FACTURACION
  await Database.rawQuery(`TRUNCATE TABLE ${Env.get('PREFIJODB')}BOTF_TMP_FACTURACION`)

  //2. Insertar los datos que vienen de Oracle

  await TblFacturacion.createMany(datosOracle);

  //3. Crear tabla temporal para la distribucion
  
  await Database.rawQuery(`TRUNCATE TABLE ${Env.get('PREFIJODB')}BOTF_TMP_FACTURACION`)
  await Database.rawQuery(`
  INSERT INTO ${Env.get('PREFIJODB')}BOTF_TMP_IDFACTURACION
  SELECT DISTINCT RPA_FOR_NUMERFORMU FROM ${Env.get('PREFIJODB')}BOTF_FACTURACION
`)

  /*
4. Distribuir los datos en la tabla final
-------- insertar los nuevos
*/

await Database.rawQuery(`
INSERT INTO ${Env.get('PREFIJODB')}BOTF_FACTURACION 
SELECT 
	a.RUT_PAC,
	a.COD_CONVENIO,
	a.CONVENIO,
	a.AMBITO,
	a.RPA_FOR_FECHADIGIT,
	a.RPA_FOR_NUMERFORMU,
	a.RPA_FOR_FECHATENCION,
	a.VALORCTA,
	a.CODIGOCENTROATEN
	
	,CURRENT_TIMESTAMP as fcarga
	,0 as estadoId 
	,CURRENT_TIMESTAMP as fultestado
	,NULL as fanalizarinfo
	,NULL as uanalizarinfo
	,NULL as fescalargestion
	,NULL as uescalargestion
	,NULL as fmarcarprestacion
	,NULL as umarcarprestacion
	,NULL as fenviobot
	,NULL as descbot
FROM
${Env.get('PREFIJODB')}BOTF_TMP_FACTURACION a
	LEFT OUTER JOIN ${Env.get('PREFIJODB')}BOTF_TMP_IDFACTURACION b on (b.RPA_FOR_NUMERFORMU = a.RPA_FOR_NUMERFORMU)
WHERE
	b.RPA_FOR_NUMERFORMU IS NULL 
;
`)

  return true;
};
const almacenarDetalles = async (datosOracle: []) => {
  console.log("Almacenar Detalle");
  const Database = (await import("@ioc:Adonis/Lucid/Database")).default;
  const TblDetalles = (await import("../Datos/Entidad/Detalles"));

  //1. Truncar la tabla BOTF_TMP_FACTURACIONDETALLE
  await Database.rawQuery(`TRUNCATE TABLE ${Env.get('PREFIJODB')}BOTF_TMP_FACTURACIONDETALLE`)

  //2. Insertar los datos que vienen de Oracle
  await TblDetalles.createMany(datosOracle);

  //3. Crear tabla temporal para la distribucion
  await Database.rawQuery(`TRUNCATE TABLE ${Env.get('PREFIJODB')}BOTF_TMP_FACTURACION`)
  await Database.rawQuery(`
  INSERT INTO ${Env.get('PREFIJODB')}BOTF_TMP_IDFACTURACION
  SELECT DISTINCT RPA_FOR_NUMERFORMU FROM ${Env.get('PREFIJODB')}BOTF_FACTURACIONDETALLE
`)

 

  /*
4. Distribuir los datos en la tabla final
-------- insertar los nuevos



*/
await Database.rawQuery(`
INSERT INTO ${Env.get('PREFIJODB')}BOTF_FACTURACIONDETALLE 
SELECT 
	a.RUT_PAC,
	a.COD_CONVENIO,
	a.RPA_FOR_FECHADIGIT,
	a.RPA_FOR_NUMERFORMU,
	a.ATE_PRE_CODIGO,
	a.PRE_PRE_DESCRIPCIO,
	a.PRE_TIP_DESCRIPCIO,
	a.RPA_FOR_FECHATENCION
	
	,CURRENT_TIMESTAMP as fcarga
	,0 as estadoId 
	,CURRENT_TIMESTAMP as fultestado
	,NULL as fanalizarinfo
	,NULL as uanalizarinfo
	,NULL as fescalargestion
	,NULL as uescalargestion
	,NULL as fmarcarprestacion
	,NULL as umarcarprestacion
	,NULL as fenviobot
FROM
${Env.get('PREFIJODB')}BOTF_TMP_FACTURACIONDETALLE a
	LEFT OUTER JOIN ${Env.get('PREFIJODB')}BOTF_TMP_IDFACTURACION b on (b.RPA_FOR_NUMERFORMU = a.RPA_FOR_NUMERFORMU)
WHERE
	b.RPA_FOR_NUMERFORMU IS NULL 
;
`)

  return true;
};

export { consultarOracleEInsertarMSSQL };
