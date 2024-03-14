import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Robot/ControladorRobot'

Route.group(() => {
  Route.get('/', accion_path + '.obtener')
  Route.post('/', accion_path + '.actualizar')

}).prefix('api/v1/robot').middleware('apiKey')