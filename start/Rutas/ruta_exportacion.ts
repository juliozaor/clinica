import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Exportacion/ControladorExportacion'

Route.group(() => {
  Route.get('xlsx', accion_path + '.exportToXLSX')
}).prefix('api/v1/exportar')//.middleware('autenticacionJwt')
