/* import ActiveDirectory from 'activedirectory';

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
      username = `clinicaces.loc\\${username}`; // Agregar el dominio al nombre de usuario
    }
    username = username.replace(/\\\\/g, '\\');
    console.log({username, password});
    
    try {
      // Realizar la autenticación con Active Directory
      const auth = await new Promise<boolean>((resolve, reject) => {
        this.ad.authenticate(username, password, (err, auth) => {
          if (err) {
            console.error('Error de autenticación en Active Directory:', err);
            reject(err);
          } else {
            console.log('Autenticación exitosa en Active Directory:', auth);
            resolve(auth);
          }
        });
      });
  
      // Si auth es true, la autenticación fue exitosa y la conexión al directorio activo se realizó correctamente
      return auth;
    } catch (error) {
      // Si hay un error, la conexión al directorio activo falló
      console.error('Error al autenticar con Active Directory:', error);
      return false;
    }
  }
} */


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






import ActiveDirectory from 'activedirectory';
import Env from "@ioc:Adonis/Core/Env";

export default class ActiveDirectoryService {
  private ad: ActiveDirectory;

  constructor() {
    // Configurar la conexión a Active Directory
    this.ad = new ActiveDirectory({
      url: 'ldap://192.168.1.20', // IP de tu servidor Active Directory
      baseDN: 'DC=clinicaces,DC=log', // Base DN de tu dominio
      username: `${Env.get("DIUSER")}@clinicaces.loc`, // Usuario con permisos para consultar el directorio
      password: Env.get("DIPASS") // Contraseña del usuario
    });
  }

  public async authenticate(username: string, password: string): Promise<boolean> {
    if (!username.includes('@clinicaces.loc')) {
      username = username + '@clinicaces.loc' ;
    }

    console.log({username, password});
    
    try {
      // Realizar la autenticación con Active Directory
      const auth = await new Promise<boolean>((resolve, reject) => {
        this.ad.authenticate(username, password, (err, auth) => {
          if (err) {
            console.error('Error de autenticación en Active Directory:', err);
            reject(err);
          } else {
            console.log('Autenticación exitosa en Active Directory:', auth);
            resolve(auth);
          }
        });
      });

      return auth;
    } catch (error) {
      console.error('Error al autenticar con Active Directory:', error);
      return false;
    }
  }

  public async userExists(username: string): Promise<boolean> {
    try {
      // Realizar una búsqueda de usuario en Active Directory
      const user = await new Promise<boolean>((resolve, reject) => {
        this.ad.findUser(username, (err, user) => {
          if (err) {
            console.error('Error al buscar usuario en Active Directory:', err);
            reject(err);
          } else {
            console.log('Usuario encontrado en Active Directory:', user);
            resolve(user);
          }
        });
      });

      return !!user; // Retorna true si se encontró el usuario, false si no se encontró
    } catch (error) {
      console.error('Error al buscar usuario en Active Directory:', error);
      return false;
    }
  }
}
