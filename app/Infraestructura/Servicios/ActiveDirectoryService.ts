import ActiveDirectory from 'activedirectory';

export default class ActiveDirectoryService {
  private ad: ActiveDirectory;

  constructor() {
    // Configurar la conexión a Active Directory
    this.ad = new ActiveDirectory({
      url: 'ldap://192.168.1.20', // IP de tu servidor Active Directory
      baseDN: 'DC=clinicaces,DC=log', // Base DN de tu dominio
    });
  }

  public async authenticate(username: string, password: string): Promise<boolean> {
    if (!username.includes('\\')) {
      username = 'clinicaces.log\\' + username;
    }
    return new Promise<boolean>((resolve, reject) => {
      this.ad.authenticate(username, password, (err, auth) => {
        if (err) {         
          console.error('Error de autenticación en Active Directory:', err);
          reject(err);
        } else {          
          console.log(auth);          
          resolve(auth);
        }
      });
    });
  }
}

/* 'use strict'

const ActiveDirectory = require('activedirectory2')

export default class ActiveDirectoryService {
  async authenticate(username: string, password: string) {
    const ad = new ActiveDirectory({
      url: 'ldap://192.168.1.20', // o ldaps://192.168.1.20 si estás usando SSL/TLS
      baseDN: 'dc=clinicaces,dc=log',
      username: `clinicaces.log\\${username}`,
      password: password
    })

    ad.authenticate(`clinicaces.log\\${username}@clinicaces.log`, password, (err, auth) => {
      if (err) {
        console.log('Error authenticating:', err)
        return 'Error en la autenticación'
      }

      if (auth) {
        console.log('Authenticated!')
        return 'Autenticado correctamente'
      } else {
        console.log('Authentication failed!')
        return 'Autenticación fallida'
      }
    })
  }
} */
