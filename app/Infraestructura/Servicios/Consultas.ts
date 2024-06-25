import { DateTime } from "luxon";
import Env from "@ioc:Adonis/Core/Env";
export class ConsultasDB {
  actualizarAnalizar = (documento: number, parametro: string): string => {
  
    return `UPDATE
    HRBOTCES.dbo.BOTF_FACTURACION
  SET
    HRBOTCES.dbo.BOTF_FACTURACION.uanalizarinfo = ${documento}
  FROM
    HRBOTCES.dbo.BOTF_FACTURACION SI
    INNER JOIN
    (	select TOP 1 
      f.RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU 
      from 
        HRBOTCES.dbo.BOTF_FACTURACION f
        INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr on (rr.tregistroId = f.tregistroId)
		INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = 'INDIVIDUAL') d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
      where 	
        f.estadoId = 2 and 
        COALESCE(f.uanalizarinfo, -1) < 1 AND 
        rr.rol_id = ${parametro}
      ORDER BY f.RPA_FOR_NUMERFORMU) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
    ;`
  };

  actualizarAgrupada = (documento: number, parametro: string): string => {
    
    return `UPDATE
    HRBOTCES.dbo.BOTF_FACTURACION
  SET
    HRBOTCES.dbo.BOTF_FACTURACION.uanalizarinfo = ${documento}
  FROM
    HRBOTCES.dbo.BOTF_FACTURACION SI
    INNER JOIN
    (
    SELECT distinct
      f2.RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU
    FROM
    (
      select TOP 1
        f.RUT_PAC as RUT_PAC
      from
        HRBOTCES.dbo.BOTF_FACTURACION f
        INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr on (rr.tregistroId = f.tregistroId)
        INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = 'AGRUPADO') d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
      where
        f.estadoId = 2 and
        COALESCE(f.uanalizarinfo, -1) < 1 
      ORDER BY f.RPA_FOR_NUMERFORMU
    ) h1
    INNER JOIN HRBOTCES.dbo.BOTF_FACTURACION f2 on (h1.RUT_PAC = f2.RUT_PAC)
    INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr2 on (rr2.tregistroId = f2.tregistroId)
    INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = 'AGRUPADO') d2 on (d2.RPA_FOR_NUMERFORMU = f2.RPA_FOR_NUMERFORMU)

  ) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU`
  
 
    };

  consultarFormulario = (
    documento: number,
    parametro: string,
    estado: number
  ): string => {

  return `SELECT f.* 
  FROM 
  HRBOTCES.dbo.BOTF_FACTURACION f
  INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr on (rr.tregistroId = f.tregistroId)
  INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = 'INDIVIDUAL') d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
  where f.estadoId = ${estado} and f.uanalizarinfo = ${documento} and rr.rol_id = ${parametro} and rr.estadoId = 1`;
  };

  consultarFormularioAgrupado = (
    documento: number,
    parametro: string,
    estado: number
  ): string => {

  return `SELECT f.* 
  FROM 
  HRBOTCES.dbo.BOTF_FACTURACION f
  INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr on (rr.tregistroId = f.tregistroId)
  INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = 'AGRUPADO') d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
  where f.estadoId = ${estado} and f.uanalizarinfo = ${documento} and rr.estadoId = 1`;
  
  };

  consultardetalles = (formulario: string) => {
    return `
SELECT d.* 
from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE d where RPA_FOR_NUMERFORMU = '${formulario}' order by RPA_FOR_FECHATENCION ;
`;
  };

  actualizarGestionar = (documento: number): string => {
    return `
          UPDATE
          HRBOTCES.dbo.BOTF_FACTURACION
          SET
          HRBOTCES.dbo.BOTF_FACTURACION.uescalargestion = ${documento}
          FROM
          HRBOTCES.dbo.BOTF_FACTURACION SI
          INNER JOIN
          (select TOP 1 
          RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU 
          from 
          HRBOTCES.dbo.BOTF_FACTURACION 
          where 	
          estadoId = 3 and 
          COALESCE(uescalargestion, -1) < 1 
          ORDER BY RPA_FOR_NUMERFORMU) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
          ;`;
  };

  actualizarValidar = (documento: number): string => {
    return `UPDATE
          HRBOTCES.dbo.BOTF_FACTURACION
          SET
          HRBOTCES.dbo.BOTF_FACTURACION.umarcarprestacion = ${documento}
          FROM
          HRBOTCES.dbo.BOTF_FACTURACION SI
          INNER JOIN
          (select TOP 1 
          RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU 
          from 
          HRBOTCES.dbo.BOTF_FACTURACION 
          where 	
          estadoId = 4 and 
          COALESCE(umarcarprestacion, -1) < 1 
          ORDER BY RPA_FOR_NUMERFORMU) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
          ;`;
  };

  obtenerFactura = (): string => {
    // return `SELECT TOP 1

   

return `SELECT
a.RUT_PAC,
a.COD_CONVENIO,
a.CONVENIO,
a.AMBITO,
a.RPA_FOR_FECHADIGIT,
a.RPA_FOR_NUMERFORMU,
a.RPA_FOR_FECHATENCION,
a.VALORCTA,
a.CODIGOCENTROATEN,
a.RPA_FOR_TIPOFORMU,
d.ATE_PRE_CODIGO,
d.PRE_PRE_DESCRIPCIO,
d.PRE_TIP_DESCRIPCIO,
d.TIPO_FORMULARIO,
a.TIPO,
a.NOM_PAC,
a.EMPRESA,
a.RPA_FOR_ETDCTA,
a.RPA_FOR_VIGENCIA,
CASE WHEN b.COD_CONVENIO IS NOT NULL THEN 1 ELSE 0 END AS ESSOAT
FROM
(
    SELECT TOP 1
        f.RUT_PAC,
        f.COD_CONVENIO,
        f.CONVENIO,
        f.AMBITO,
        f.RPA_FOR_FECHADIGIT,
        f.RPA_FOR_NUMERFORMU,
        f.RPA_FOR_FECHATENCION,
        f.VALORCTA,
        f.CODIGOCENTROATEN,
        f.RPA_FOR_TIPOFORMU,
        f.TIPO,
        f.NOM_PAC,
        f.EMPRESA,
        f.RPA_FOR_ETDCTA,  
        f.RPA_FOR_VIGENCIA
    FROM
        HRBOTCES.dbo.BOTF_FACTURACION f
    WHERE 
        f.estadoId = 5 
        AND f.RPA_FOR_NUMERFORMU_PID IS NULL
    ORDER BY 
        f.RPA_FOR_NUMERFORMU
) a
LEFT JOIN HRBOTCES.dbo.BOTF_CONV_SOAT b ON a.COD_CONVENIO = b.COD_CONVENIO
LEFT OUTER JOIN HRBOTCES.dbo.BOTF_FACTURACIONDETALLE d ON d.RPA_FOR_NUMERFORMU = a.RPA_FOR_NUMERFORMU;`

  };

  actualizarRobotConsulta = (rpa: string): string => {
    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    return `UPDATE HRBOTCES.dbo.BOTF_FACTURACION  SET estadoId = 6,
    fenviobot = '${fechaActual}' WHERE  RPA_FOR_NUMERFORMU = '${rpa}'`;
  };

  actualizarRobotRespuesta = (
    rpa: number,
    estado: number,
    mensaje: string,
    nFactura: string
  ): string => {
    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    const estadoId = estado == 0 ? 7 : 8;
    return `UPDATE HRBOTCES.dbo.BOTF_FACTURACION  SET estadoId = ${estadoId},
    fultestado = '${fechaActual}', descbot = '${mensaje}', nfactura = '${nFactura}' WHERE  RPA_FOR_NUMERFORMU = '${rpa}'`;
  };


  obtenerFacturaAgrupadas = (): string => {
return `SELECT
a.RUT_PAC,
a.COD_CONVENIO,
a.CONVENIO,
a.AMBITO,
a.RPA_FOR_FECHADIGIT,
a.RPA_FOR_NUMERFORMU,
a.RPA_FOR_FECHATENCION,
a.VALORCTA,
a.CODIGOCENTROATEN,
a.RPA_FOR_TIPOFORMU,
a.TIPO,
a.NOM_PAC,
a.EMPRESA,
a.RPA_FOR_ETDCTA,
a.RPA_FOR_VIGENCIA,
d.ATE_PRE_CODIGO,
d.PRE_PRE_DESCRIPCIO,
d.PRE_TIP_DESCRIPCIO,
d.TIPO_FORMULARIO,
CASE WHEN c.COD_CONVENIO IS NOT NULL THEN 1 ELSE 0 END AS ESSOAT
FROM
(
    SELECT TOP 1
        f.RPA_FOR_NUMERFORMU_PID 		 
    FROM
        HRBOTCES.dbo.BOTF_FACTURACION f	 
    WHERE 
        f.estadoId = 5 
        AND f.RPA_FOR_NUMERFORMU_PID IS NOT NULL	  
) b  
INNER JOIN 
BOTF_FACTURACION a ON (a.RPA_FOR_NUMERFORMU_PID = b.RPA_FOR_NUMERFORMU_PID)   
LEFT OUTER JOIN 
HRBOTCES.dbo.BOTF_FACTURACIONDETALLE d ON (d.RPA_FOR_NUMERFORMU = a.RPA_FOR_NUMERFORMU) 
LEFT OUTER JOIN 
HRBOTCES.dbo.BOTF_CONV_SOAT c ON a.COD_CONVENIO = c.COD_CONVENIO
WHERE
a.estadoId = 5 
AND a.RPA_FOR_NUMERFORMU_PID IS NOT NULL;`
  }



  consultarFormularioBusqueda= (
    tipo: string,
    formularioId?: string,
    rut?:string
  ): string => {

    if(tipo === 'INDIVIDUAL'){
      return ` SELECT top 1 SI.*
      FROM
        HRBOTCES.dbo.BOTF_FACTURACION SI
        INNER JOIN
        (   select
          f.RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU
          from
            HRBOTCES.dbo.BOTF_FACTURACION f
            INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr on (rr.tregistroId = f.tregistroId)
            INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = '${ tipo }') d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
          where
            f.estadoId IN (0,2,10) ) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU where SI.RPA_FOR_NUMERFORMU ='${ formularioId }' AND SI.estadoId IN (0,2,10);`;

 
  }else{
    return `select SI.*
    FROM
      HRBOTCES.dbo.BOTF_FACTURACION SI
      INNER JOIN
      (
      SELECT distinct
        f2.RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU
      FROM
      (
        select 
          f.RUT_PAC as RUT_PAC
        from
          HRBOTCES.dbo.BOTF_FACTURACION f
          INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr on (rr.tregistroId = f.tregistroId)
          INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = '${ tipo }') d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
        where
          f.estadoId IN (0,2,10)
      ) h1
      INNER JOIN HRBOTCES.dbo.BOTF_FACTURACION f2 on (h1.RUT_PAC = f2.RUT_PAC)
      INNER JOIN HRBOTCES.dbo.BOTF_TREGISTRO_ROL rr2 on (rr2.tregistroId = f2.tregistroId)
      INNER JOIN (select distinct RPA_FOR_NUMERFORMU from HRBOTCES.dbo.BOTF_FACTURACIONDETALLE where TIPO_FORMULARIO = '${ tipo }') d2 on (d2.RPA_FOR_NUMERFORMU = f2.RPA_FOR_NUMERFORMU)

    ) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
    where SI.RUT_PAC = '${ rut }' AND SI.estadoId IN (0,2,10);`;


  }
  
  }

}
