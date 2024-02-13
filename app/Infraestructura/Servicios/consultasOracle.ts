import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env';
const oracledb = require('oracledb');
export class ServicioOracle{

  public async consultarOracleYInsertarMSSQL () {
    let connection
    try {
      oracledb.initOracleClient();     
     
      connection = await oracledb.getConnection({
        user: Env.get('ORACLE_USER'),
        password: Env.get('ORACLE_PASSWORD'),  // contains the hr schema password
        connectString: Env.get('ORACLE_DB_NAME'),
        encoding: 'UTF-8'

      });


    } catch (error) {
      return {estado:1,error}
    }

    let consulta = `select 
    Funglbgetrutpac(rpa.pac_pac_numero) rut_pac,   
    rpa.CON_CON_CODIGO Cod_Convenio,
    rpa.rpa_for_fechadigit,
    rpa.rpa_for_numerformu,
    p.ATE_PRE_CODIGO,
    pr.PRE_PRE_DESCRIPCIO,
    s.PRE_TIP_DESCRIPCIO,
    rpa.rpa_for_fechatencion
  from 
    ADMSALUD.rpa_formulario rpa,
    ADMSALUD.con_convenio c,
    ADMSALUD.ate_prestacion p,
    ADMSALUD.pre_prestacion pr,
    ADMSALUD.PRE_Tipo s 
  WHERE  
    Trunc(rpa.rpa_for_fechatencion) >= To_date('2024/01/01', 'yyyy/mm/dd')
    AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(To_date('2024/01/25', 'yyyy/mm/dd'))
    AND rpa.rpa_for_tipoformu = '02  '
    AND rpa.rpa_for_vigencia <> 'N'
    AND rpa.pac_pac_numero NOT IN( 1308, 29062, 5024, 40487, 43624, 1917, 19058 )
    AND rpa.rpa_for_fechatencion <> To_date('1900/01/01', 'yyyy/mm/dd')
    AND rpa.fac_fac_fechafacturacion = To_date('1900/01/01', 'yyyy/mm/dd')
    AND rpa.con_con_codigo <> 'CP      '
    AND rpa.con_con_codigo = c.con_con_codigo
    and rpa.rpa_for_urgencia <> 'S' AND rpa.rpa_for_urgencia <>'H'
    and p.ATE_PRE_NUMERFORMU=rpa.RPA_FOR_NUMERFORMU
    and pr.PRE_PRE_CODIGO=p.ATE_PRE_CODIGO
    and s.PRE_TIP_TIPO=pr.PRE_PRE_TIPO
      
  union
  
  select 
    Funglbgetrutpac(rpa.pac_pac_numero) rut_pac,   
    rpa.CON_CON_CODIGO Cod_Convenio,
    rpa.rpa_for_fechadigit,
    rpa.rpa_for_numerformu,
    p.ATE_INS_CODIGO,
    pr.FLD_PRODUCTOGLOSA,
    decode (ATC_EST_NUMERO, '0', 'medicamentos'), 
    rpa.rpa_for_fechatencion
  from 
    ADMSALUD.rpa_formulario rpa,
    ADMSALUD.con_convenio c,
    ADMSALUD.ate_insumos p,
    ADMSALUD.aba_producto pr
  WHERE  
    Trunc(rpa.rpa_for_fechatencion) >= To_date('2024/01/01', 'yyyy/mm/dd')
    AND Trunc(rpa.rpa_for_fechatencion) <= Last_day(CURRENT_DATE)
    AND rpa.rpa_for_tipoformu = '02  '
    AND rpa.rpa_for_vigencia <> 'N'
    AND rpa.pac_pac_numero NOT IN( 1308, 29062, 5024, 40487, 43624, 1917, 19058 )
    AND rpa.rpa_for_fechatencion <> To_date('1900/01/01', 'yyyy/mm/dd')
    AND rpa.fac_fac_fechafacturacion = To_date('1900/01/01', 'yyyy/mm/dd')
    AND rpa.con_con_codigo <> 'CP      '
    AND rpa.con_con_codigo = c.con_con_codigo
    and rpa.rpa_for_urgencia <> 'S' AND rpa.rpa_for_urgencia <>'H'
    and p.ATE_INS_NUMERFORMU=rpa.RPA_FOR_NUMERFORMU
    and pr.FLD_PRODUCTOCODIGO=p.ATE_INS_CODIGO
  
  `

  let datosOracle
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
      datosOracle = await connection.execute(consulta,
        [], // no binds
        {
          outFormat: oracledb.OBJECT
        });

        return datosOracle

    } catch (error) {
      await connection.close();
     /*  return ctx.response.status(500).send({
        mensaje: `Error de procesamiento de vista`,
        error: 3
      }) */
      return {estado:2, error}
    }
  }

}