import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Documentos/ControladorDocumentos'

Route.group(() => {
  Route.get('/', accion_path + '.mostrar')
  Route.patch('/:estado/:boton', accion_path + '.actualizar')

}).prefix('api/v1/facturas').middleware('autenticacionJwt')