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
        nombreMostrar: 'Analizar información',
        estado: true,
        orden:2,
        ruta:'formulario/analizar',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },{
        id: '003',
        nombre: 'gestionar',
        nombreMostrar: 'Escalar para gestión',
        estado: true,
        orden:3,
        ruta:'formulario/gestionar',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      },{
        id: '004',
        nombre: 'validar',
        nombreMostrar: 'Marcar prestación (Crear factura)',
        estado: true,
        orden:4,
        ruta:'formulario/validar',
        actualizacion: DateTime.now(),
        creacion: DateTime.now(),
      }

    ])
  }
}
