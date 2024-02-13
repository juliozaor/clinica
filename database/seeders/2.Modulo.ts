import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TblModulos from 'App/Infraestructura/Datos/Entidad/Autorizacion/Modulo'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run () {
    await TblModulos.createMany([
      {
        id: '001',
        nombre: 'usuarios',
        nombreMostrar: 'Administración de usuarios',
        estado: true,
        orden:1,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '002',
        nombre: 'archivos',
        nombreMostrar: 'Admin. servicios',
        estado: true,
        orden:2,
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      }

    ])
  }
}
