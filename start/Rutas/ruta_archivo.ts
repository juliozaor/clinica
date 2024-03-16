import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Archivos/ControladorArchivo'

Route.group(() => {
  Route.get('facturas', accion_path + '.facturas')
  Route.get('registros', accion_path + '.registros')
  Route.get('', accion_path + '.abrir')
  Route.put('', accion_path + '.actualizar')
  Route.delete('', accion_path + '.eliminar').middleware('permiso:012,004')
  Route.post('', accion_path + '.crear')
  Route.get('descargar', accion_path + '.descargar')
  Route.get('soportes', accion_path + '.soportes')
}).prefix('api/v1/archivos').middleware('autenticacionJwt')
