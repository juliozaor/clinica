import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Robot/ControladorRobot'

Route.group(() => {
  Route.get('/', accion_path + '.obtener')
  Route.get('/agrupados', accion_path + '.obtenerAgrupadas')
  Route.post('/', accion_path + '.actualizar')
  Route.post('/agrupados', accion_path + '.actualizarAgrupados')

}).prefix('api/v1/robot').middleware('apiKey')