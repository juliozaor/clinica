import Env from "@ioc:Adonis/Core/Env";
const oracledb = require("oracledb");
import fs from "fs";
import path from "path";
const consultarOracleEInsertarMSSQL = async (tipo: number) => {
  
  
  const {ServicioLogs} = await import("../../Dominio/Datos/Servicios/ServicioLogs");
  const servicioLogs = new ServicioLogs();
  let connection;
  const tnsAdminPath = path.join(__dirname, "tns");
  process.env.TNS_ADMIN = tnsAdminPath;

  try {
    await oracledb.initOracleClient();

    connection = await oracledb.getConnection({
      connectString: "PRUEBAS", // Nombre del alias de servicio en tnsnames.ora
      user: "ADMCES",
      password: "S*STE#AS2021",
    });
    servicioLogs.Oracle("Conectar bd", "Conexión establecida");
    console.log("Conexión establecida con Oracle Database");
  } catch (error) {
    servicioLogs.Oracle("Conectar bd", "Fallo conexión");
    console.log("Fallo conexion con Oracle Database", error);

    return { estado: 1, error };
  }

  let consulta: string;
  try {
    
    const tipoConsulta = tipo == 1 ? "ora_facturas.sql" : "ora_detalle.sql";
    
    console.log({tipoConsulta});
    const rutaArchivo = path.resolve(__dirname, tipoConsulta);
    consulta = fs.readFileSync(rutaArchivo, "utf-8");
  } catch (error) {
    return { estado: 2, error };
  }

  let datosOracle;
  try {
    console.log("Ejecutando consulta Oracle: ", /* consulta */);

    datosOracle = await connection.execute(consulta, [], {
      outFormat: oracledb.OBJECT,
    });

    console.log("Insertando datos en tabla temporal Sql Server");

    if (datosOracle?.rows.length > 0) {
      console.log(datosOracle?.rows.length)
      servicioLogs.Oracle("Ejecutar consulta", `Datos encontrados ${tipo}`);
      if (tipo == 1) {
       // await almacenarFacturas(datosOracle?.rows);
      }
      if (tipo == 2) {
       // await almacenarDetalles(datosOracle?.rows);
      }
    } else {
      console.log({tipo});
      let msj = ''
      if (tipo == 1) {
        msj = 'Datos no encontrados de formularios'
      }
      if (tipo == 2) {
        msj = 'Datos no encontrados de detalles'
      }
      servicioLogs.Oracle("Ejecutar consulta", msj);
      console.log( {msj});
    }

    console.log("Distribución de datos terminada en Sql Server");
    servicioLogs.Oracle(
      "Almacenar datos",
      "Distribución de datos terminada en Sql Server"
    );

    await connection.close();

    return true;
  } catch (error) {
     console.log(error);

    await connection.close();
  }
};

//Almacenar facturas
const almacenarFacturas = async (datosOracle: []) => {
  const {ServicioLogs} = await import("../../Dominio/Datos/Servicios/ServicioLogs");
  const servicioLogs = new ServicioLogs();
  servicioLogs.Oracle("Almacenar datos", "Formulario");

  console.log("Almacenar Factura");
  const Database = (await import("@ioc:Adonis/Lucid/Database")).default;
  const facturaModel = await import("../Datos/Entidad/Facturacion");

  try {
   console.log("Inicio logica formulario");
   

  //1. Truncar la tabla BOTF_TMP_FACTURACION
  await Database.rawQuery(
    `TRUNCATE TABLE ${Env.get("PREFIJODB")}BOTF_TMP_FACTURACION`
  );

  //2. Insertar los datos que vienen de Oracle

  await facturaModel.TblFacturacion.createMany(datosOracle);

  //3. Crear tabla temporal para la distribucion

  await Database.rawQuery(
    `TRUNCATE TABLE ${Env.get("PREFIJODB")}BOTF_TMP_FACTURACION`
  );
  await Database.rawQuery(`
  INSERT INTO ${Env.get("PREFIJODB")}BOTF_TMP_IDFACTURACION
  SELECT DISTINCT RPA_FOR_NUMERFORMU FROM ${Env.get(
    "PREFIJODB"
  )}BOTF_FACTURACION
`);

  /*
4. Distribuir los datos en la tabla final
-------- insertar los nuevos
*/

  await Database.rawQuery(`
  INSERT INTO ${Env.get("PREFIJODB")}BOTF_FACTURACION 
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
    
    ,0 as tregistroId
    ,NULL as causalid
    ,NULL as nfactura
  FROM
  ${Env.get("PREFIJODB")}BOTF_TMP_FACTURACION a
    LEFT OUTER JOIN ${Env.get(
      "PREFIJODB"
    )}BOTF_TMP_IDFACTURACION b on (b.RPA_FOR_NUMERFORMU = a.RPA_FOR_NUMERFORMU)
  WHERE
    b.RPA_FOR_NUMERFORMU IS NULL 
  ;
`);

	/*
	4.1. Validar si es SOAT y asignarlo
	
	*/

  await Database.rawQuery(`
  UPDATE ${Env.get("PREFIJODB")}BOTF_FACTURACION SET tregistroId = 1, estadoId = 2
  WHERE coalesce(tregistroId, 0) = 0 and estadoId = 0 and COD_CONVENIO IN (SELECT COD_CONVENIO FROM ${Env.get("PREFIJODB")}BOTF_CONV_SOAT WHERE estadoId = 1);
  `);
  
    /*
    4.2.  Para imagen, laboratorio y consulta externa
    
    */
  
  await Database.rawQuery(`
  UPDATE
      ${Env.get("PREFIJODB")}BOTF_FACTURACION
  SET
      ${Env.get("PREFIJODB")}BOTF_FACTURACION.tregistroId = RAN.tregistroId, 
      ${Env.get("PREFIJODB")}BOTF_FACTURACION.estadoId = 2
  FROM
      ${Env.get("PREFIJODB")}BOTF_FACTURACION SI
  INNER JOIN
      ${Env.get("PREFIJODB")}BOTF_AMBITOFLOW RAN
  ON 
      SI.AMBITO = RAN.AMBITO and RAN.estadoId = 1 and coalesce(SI.tregistroId, 0) = 0 and SI.estadoId = 0 ;
  `);
  
  
  
    /*
    4.3. Validar laboratorio y patologia
    
    */
  
  await Database.rawQuery(`
  UPDATE ${Env.get("PREFIJODB")}BOTF_FACTURACION SET tregistroId = 7, estadoId = 2
  WHERE coalesce(tregistroId, 0) = 0 and estadoId = 0 and COD_CONVENIO IN (SELECT COD_CONVENIO FROM ${Env.get("PREFIJODB")}BOTF_CONV_LABPATO WHERE estadoId = 1);
  `);
  
  
    /*
    4.4. Validar ATE_PRE_CODIGO
    
    */
  
  await Database.rawQuery(`
  UPDATE ${Env.get("PREFIJODB")}BOTF_FACTURACION SET tregistroId = 6, estadoId = 2
  WHERE coalesce(tregistroId, 0) = 0 and estadoId = 0 and RPA_FOR_NUMERFORMU IN (
      SELECT a.RPA_FOR_NUMERFORMU FROM ${Env.get("PREFIJODB")}BOTF_FACTURACIONDETALLE a INNER JOIN ${Env.get("PREFIJODB")}BOTF_ATEPREFLOW b on (b.ATE_PRE_CODIGO = a.ATE_PRE_CODIGO) WHERE b.estadoId = 1);
  `);

   console.log("Fin logica formulario");
   
} catch (error) {
    console.log(error);
    
}

  return true;
};


//Almacenar detalles

const almacenarDetalles = async (datosOracle: []) => {
  const {ServicioLogs} = await import("../../Dominio/Datos/Servicios/ServicioLogs");
  const servicioLogs = new ServicioLogs();
  servicioLogs.Oracle("Almacenar datos", "Detalles");
  console.log("Almacenar Detalle");
  const Database = (await import("@ioc:Adonis/Lucid/Database")).default;
  const detalleModel = await import("../Datos/Entidad/Detalles");

  try {
console.log("Inicio de logica detalle");

  //1. Truncar la tabla BOTF_TMP_FACTURACIONDETALLE
  await Database.rawQuery(
    `TRUNCATE TABLE ${Env.get("PREFIJODB")}BOTF_TMP_FACTURACIONDETALLE`
  );

  //2. Insertar los datos que vienen de Oracle
  await detalleModel.TblDetalles.createMany(datosOracle);

  //3. Crear tabla temporal para la distribucion
  await Database.rawQuery(
    `TRUNCATE TABLE ${Env.get("PREFIJODB")}BOTF_TMP_FACTURACION`
  );
  await Database.rawQuery(`
  INSERT INTO ${Env.get("PREFIJODB")}BOTF_TMP_IDFACTURACION
  SELECT DISTINCT RPA_FOR_NUMERFORMU FROM ${Env.get(
    "PREFIJODB"
  )}BOTF_FACTURACIONDETALLE
`);

  /*
4. Distribuir los datos en la tabla final
-------- insertar los nuevos



*/
  await Database.rawQuery(`
INSERT INTO ${Env.get("PREFIJODB")}BOTF_FACTURACIONDETALLE 
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
${Env.get("PREFIJODB")}BOTF_TMP_FACTURACIONDETALLE a
	LEFT OUTER JOIN ${Env.get(
    "PREFIJODB"
  )}BOTF_TMP_IDFACTURACION b on (b.RPA_FOR_NUMERFORMU = a.RPA_FOR_NUMERFORMU)
WHERE
	b.RPA_FOR_NUMERFORMU IS NULL 
;
`);

console.log("Fin de logica detalle");
  }
catch (error) {
    console.log(error);
    
}

  return true;
};

export { consultarOracleEInsertarMSSQL };
