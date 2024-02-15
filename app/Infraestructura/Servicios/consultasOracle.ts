import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";
const oracledb = require("oracledb");
import fs from "fs";
import path from "path";
export class ServicioOracle {
  public async consultarOracleYInsertarMSSQL() {
    let connection;
    try {
      oracledb.initOracleClient();

      connection = await oracledb.getConnection({
        user: Env.get("ORACLE_USER"),
        password: Env.get("ORACLE_PASSWORD"), // contains the hr schema password
        connectString: Env.get("ORACLE_DB_NAME"),
        encoding: "UTF-8",
      });
    } catch (error) {
      return { estado: 1, error };
    }

    let consulta: string;
    try {
      const rutaArchivo = path.resolve(__dirname, "ora_detalle.sql");
      consulta = fs.readFileSync(rutaArchivo, "utf-8");
    } catch (error) {
      return { estado: 2, error };
    }

    let datosOracle;
    /*   try {
      // Consultar datos en Oracle
      const datosOracle = await Database.connection('oracle').rawQuery();
      console.log('Datos consultados en Oracle:', datosOracle);
      
      // Insertar los datos en SQL Server
      //  await Database.connection('mssql').table('tabla_sql_server').insert(datosOracle);
      console.log('Datos insertados en SQL Server correctamente.');
      return datosOracle
    } catch (error) {
      console.error('Error al consultar datos en Oracle e insertar en SQL Server:', error);
    } */

    try {
      datosOracle = await connection.execute(consulta, [], {
        outFormat: oracledb.OBJECT,
      });

      return datosOracle;
    } catch (error) {
      await connection.close();
      return { estado: 3, error };
    }
  }
}
