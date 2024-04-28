import Route from '@ioc:Adonis/Core/Route'
const accion_path = '../../../app/Presentacion/Rol/ControladorRol'

Route.group(() => {
  Route.get('', accion_path + '.listar')
  Route.get('listar/:pagina?/:limite?', accion_path + '.listarTodos')
  Route.get(':id', accion_path + '.obtenerRolPorId')
/*   Route.post('', accion_path + '.registrar')
  Route.patch('/:id', `${accion_path}.actualizar`) */
  }).prefix('api/v1/rol').middleware(['autenticacionJwt'])//middleware(['autenticacionJwt', 'permiso:001,001']) //permiso:{moduloId},{funcionalidadId}
