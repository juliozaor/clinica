import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Documentos/ControladorDocumentos'

Route.group(() => {
  Route.get('/', accion_path + '.mostrar')
}).prefix('api/v1/documentos').middleware('autenticacionJwt')