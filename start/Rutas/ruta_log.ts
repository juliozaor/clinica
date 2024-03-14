import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Logs/ControladorLogs'

Route.group(() => {
  Route.get('/', accion_path + '.obtener')
}).prefix('api/v1/logs').middleware('autenticacionJwt')
