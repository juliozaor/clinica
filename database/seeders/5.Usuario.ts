import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DateTime } from 'luxon'
import TblUsuarios from 'App/Infraestructura/Datos/Entidad/Usuario'
import { ROLES } from 'App/Dominio/DiccionarioAutorizacion'
import { v4 } from 'uuid'


export default class extends BaseSeeder {
  public async run () {
    await TblUsuarios.createMany([
        {
            nombre: 'Administrador',
            clave: '$bcrypt$v=98$r=10$SVkH7OC3YnSS6r5n+/L+9w$V9CKtEmH282nBDPHb8fa43laPN/dojE', //Super23+
            correo: 'julio.zaor@gmail.com',
            fechaNacimiento: new Date('11/01/1999'),
            identificacion: '0000000',
            idRol: ROLES.ADMINISTRADOR,
            usuario: '0000000',
            id: v4() 
        },
        {
          nombre: 'Ejecutivo',
          clave: '$bcrypt$v=98$r=10$SVkH7OC3YnSS6r5n+/L+9w$V9CKtEmH282nBDPHb8fa43laPN/dojE', //Super23+
          correo: 'julio.jimenez@gmail.com',
          fechaNacimiento: new Date('11/01/1999'),
          identificacion: '11111111',
          idRol: ROLES.EJECUTIVO,
          usuario: '11111111',
          id: v4() 
      }
    ])
  }
}
