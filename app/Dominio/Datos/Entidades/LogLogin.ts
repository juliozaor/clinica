import { DateTime } from "luxon";

export class LogLogin{
  id?: string;
  usuario: string;
  estadoLogin: string;
  mensajeError: string;
  creacion: DateTime;
}
