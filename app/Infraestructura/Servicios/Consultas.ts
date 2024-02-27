import { DateTime } from "luxon";
import Env from "@ioc:Adonis/Core/Env";
export class ConsultasDB {
  actualizarAnalizar = (documento: number): string => {
    return `UPDATE
          ${Env.get('PREFIJODB')}BOTF_FACTURACION
          SET
          ${Env.get('PREFIJODB')}BOTF_FACTURACION.uanalizarinfo = ${documento}
          FROM
          ${Env.get('PREFIJODB')}BOTF_FACTURACION SI
          INNER JOIN
          (select TOP 1 
          RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU 
          from 
          ${Env.get('PREFIJODB')}BOTF_FACTURACION 
          where 	
          estadoId = 2 and 
          COALESCE(uanalizarinfo, -1) < 1 
          ORDER BY RPA_FOR_NUMERFORMU) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
          ;`;
  };

  actualizarGestionar = (documento: number): string => {
    return `
          UPDATE
          ${Env.get('PREFIJODB')}BOTF_FACTURACION
          SET
          ${Env.get('PREFIJODB')}BOTF_FACTURACION.uescalargestion = ${documento}
          FROM
          ${Env.get('PREFIJODB')}BOTF_FACTURACION SI
          INNER JOIN
          (select TOP 1 
          RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU 
          from 
          ${Env.get('PREFIJODB')}BOTF_FACTURACION 
          where 	
          estadoId = 3 and 
          COALESCE(uescalargestion, -1) < 1 
          ORDER BY RPA_FOR_NUMERFORMU) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
          ;`;
  };

  actualizarValidar = (documento: number): string => {
    return `UPDATE
          ${Env.get('PREFIJODB')}BOTF_FACTURACION
          SET
          ${Env.get('PREFIJODB')}BOTF_FACTURACION.umarcarprestacion = ${documento}
          FROM
          ${Env.get('PREFIJODB')}BOTF_FACTURACION SI
          INNER JOIN
          (select TOP 1 
          RPA_FOR_NUMERFORMU as RPA_FOR_NUMERFORMU 
          from 
          ${Env.get('PREFIJODB')}BOTF_FACTURACION 
          where 	
          estadoId = 4 and 
          COALESCE(umarcarprestacion, -1) < 1 
          ORDER BY RPA_FOR_NUMERFORMU) t2 ON t2.RPA_FOR_NUMERFORMU = SI.RPA_FOR_NUMERFORMU
          ;`;
  };

  obtenerFactura = (): string => {
    return `SELECT TOP 1
    f.RUT_PAC,
    f.COD_CONVENIO,
    f.CONVENIO,
    f.AMBITO,
    f.RPA_FOR_FECHADIGIT,
    f.RPA_FOR_NUMERFORMU,
    f.RPA_FOR_FECHATENCION,
    f.VALORCTA,
    f.CODIGOCENTROATEN
    
    ,d.ATE_PRE_CODIGO
    ,d.PRE_PRE_DESCRIPCIO
    ,d.PRE_TIP_DESCRIPCIO
  FROM
    ${Env.get('PREFIJODB')}BOTF_FACTURACION f
    
    LEFT OUTER JOIN ${Env.get('PREFIJODB')}BOTF_FACTURACIONDETALLE d on (d.RPA_FOR_NUMERFORMU = f.RPA_FOR_NUMERFORMU)
  WHERE 
    f.estadoId = 5
  ORDER BY 
    f.RPA_FOR_NUMERFORMU
  ;`;
  };

  actualizarRobotConsulta = (rpa: number): string => {
    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    return `UPDATE ${Env.get('PREFIJODB')}BOTF_FACTURACION  SET estadoId = 6,
    fenviobot = '${fechaActual}' WHERE  RPA_FOR_NUMERFORMU = '${rpa}'`;
  };

  actualizarRobotRespuesta = (
    rpa: number,
    estado: number,
    mensaje: string
  ): string => {
    const fechaActual = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss.SSS");
    const estadoId = estado == 0 ? 7 : 8;
    return `UPDATE ${Env.get('PREFIJODB')}BOTF_FACTURACION  SET estadoId = ${estadoId},
    fultestado = '${fechaActual}', descbot = '${mensaje}' WHERE  RPA_FOR_NUMERFORMU = '${rpa}'`;
  };
}
