/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { consultarOracleEInsertarMSSQL } from 'App/Infraestructura/Tareas/consultarOracleEInsertarMSSQL'

export default class ControladorPrueba {
  constructor () {
  }

  public async probar ({ request, params }) {
    const empresa = await consultarOracleEInsertarMSSQL(params.id)
    return empresa
  }

}
