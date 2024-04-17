import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Documentos/ControladorDocumentos'

Route.group(() => {
  Route.get('/', accion_path + '.mostrar')
  Route.get('/agrupadas', accion_path + '.mostrarAgrupadas')
  Route.get('/causas', accion_path + '.causas')
  Route.get('/buscar', accion_path + '.buscar')
  Route.get('/obtener', accion_path + '.obtenerBusqueda')

  Route.patch('/:estado/:boton', accion_path + '.actualizar')
  Route.patch('/agrupados/:estado/:boton', accion_path + '.actualizarAgrupados')

}).prefix('api/v1/facturas').middleware('autenticacionJwt')