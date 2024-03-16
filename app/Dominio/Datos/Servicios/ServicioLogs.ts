import { TblLogsArchivos } from "App/Infraestructura/Datos/Entidad/LogsArchivo";
import { TblLogsForms } from "App/Infraestructura/Datos/Entidad/LogsForms";
import { TblLogsLogins } from "App/Infraestructura/Datos/Entidad/LogsLogin";
import { TblLogsOracles } from "App/Infraestructura/Datos/Entidad/LogsOracle";
import { TblLogsRobots } from "App/Infraestructura/Datos/Entidad/LogsRobot";

export class ServicioLogs {
  public async Login(usuario: string, estado: string, mensajeError: string) {
    const logsLogin = new TblLogsLogins();
    logsLogin.usuario = usuario;
    logsLogin.estadoLogin = estado;
    logsLogin.mensajeError = mensajeError;
    await logsLogin.save();
  }

  public async Forms(
    usuario: string,
    rol: string,
    rpaForNumerformu: string,
    accion: number,
    estado: number
  ) {
    const logsForms = new TblLogsForms();
    logsForms.usuario = usuario;
    logsForms.rol = rol;
    logsForms.rpaForNumerformu = rpaForNumerformu;
    logsForms.accionId = accion;
    logsForms.estado = estado;
    await logsForms.save();
  }

  public async Robot(
    rpaForNumerformu: string,
    descripcion: string,
    estado: number
  ) {
    const logsRobot = new TblLogsRobots();
    logsRobot.rpaForNumerformu = rpaForNumerformu;
    logsRobot.descripcion = descripcion;
    logsRobot.estado = estado;
    await logsRobot.save();
  }

  public async Oracle(
    accion: string,
    estado: string
  ) {
    const logsOracle = new TblLogsOracles();
    logsOracle.accion = accion;
    logsOracle.estado = estado;
    await logsOracle.save();
  }

  public async Archivo(factura: string, archivo: string, accion: string, usuario:string, estado:string) {
    const logsArchivo = new TblLogsArchivos();
    logsArchivo.factura = factura;
    logsArchivo.archivo = archivo;
    logsArchivo.accion = accion
    logsArchivo.usuario = usuario;
    logsArchivo.estado = estado
    await logsArchivo.save();
  }
}


