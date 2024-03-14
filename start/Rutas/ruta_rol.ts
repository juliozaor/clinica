import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Rol/ControladorRol'

Route.group(() => {
  Route.get('', accion_path + '.listar')
}).prefix('api/v1/rol').middleware(['autenticacionJwt'])//middleware(['autenticacionJwt', 'permiso:001,001']) //permiso:{moduloId},{funcionalidadId}
