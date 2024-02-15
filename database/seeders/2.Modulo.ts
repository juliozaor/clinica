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
        ruta:'/usuarios',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },
      {
        id: '002',
        nombre: 'analizar',
        nombreMostrar: 'Documentos por analizar',
        estado: true,
        orden:2,
        ruta:'/analizar',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },{
        id: '003',
        nombre: 'gestionar',
        nombreMostrar: 'Documentos por gestionar',
        estado: true,
        orden:3,
        ruta:'/gestionar',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },{
        id: '004',
        nombre: 'validar',
        nombreMostrar: 'Documentos por validar',
        estado: true,
        orden:4,
        ruta:'/validar',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      }

    ])
  }
}
