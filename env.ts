/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  APP_KEY: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
/* 
  SMTP_HOST: Env.schema.string({format: 'host'}),
  SMTP_PASSWORD: Env.schema.string(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PORT: Env.schema.number(),

  EMAIL_ALIAS: Env.schema.string(),

  APP_NAME: Env.schema.string(), */

  JWT_SECRET_KEY: Env.schema.string(),

/*   RUTA_FICHEROS: Env.schema.string(),

  URL_SERVICIO_ARCHIVOS: Env.schema.string({ format: 'url' }) */
  TZ: Env.schema.string(),
  APIKEY: Env.schema.string(),
  DIRACT:Env.schema.number(),
  BASEPATH: Env.schema.string()
})
