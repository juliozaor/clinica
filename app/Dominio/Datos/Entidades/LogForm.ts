import { DateTime } from "luxon";

export class LogForm{
  id?: string;
  usuario: string;
  rol: string;
  rpaForNumerformu: string;
  accionId: number;
  estado: number;
  creacion: DateTime;
  accion?:string;

}
