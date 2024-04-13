import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Documentos/ControladorDocumentos'

Route.group(() => {
  Route.get('/', accion_path + '.mostrar')
  Route.get('/agrupadas', accion_path + '.mostrarAgrupadas')
  Route.get('/causas', accion_path + '.causas')
  Route.patch('/:estado/:boton', accion_path + '.actualizar')
  Route.patch('/agrupados/:estado/:boton', accion_path + '.actualizarAgrupados')

}).prefix('api/v1/facturas').middleware('autenticacionJwt')