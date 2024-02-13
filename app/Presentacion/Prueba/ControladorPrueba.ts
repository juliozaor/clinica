/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServicioOracle } from 'App/Infraestructura/Servicios/consultasOracle'

export default class ControladorPrueba {
  private service: ServicioOracle
  constructor () {
    this.service = new ServicioOracle()
  }

  public async probar ({ request }) {
    const empresa = await this.service.consultarOracleYInsertarMSSQL()
    return empresa
  }

}
