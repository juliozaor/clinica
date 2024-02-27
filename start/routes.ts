import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { extname } from 'path'
import Drive from '@ioc:Adonis/Core/Drive'
const accion_path = '../../../app/Presentacion/Prueba/ControladorPrueba'

Route.get('/', async ({ response }: HttpContextContract) => {
  response.status(200).send('¡Bienvenido!')
})

Route.get('/recursos/*', async ({request, response}:HttpContextContract) => {
  const ruta = request.param('*').join('/')
  const path = `${ruta}`
  try {
      const { size } = await Drive.getStats(path)
      response.type(extname(path))
      response.header('content-length', size)
      response.stream(await Drive.getStream(path))
  } catch(e){
      console.log(e)
      response.status(404).send(undefined)
  }
})

Route.group(() => {
  Route.get('/consulta-oracle/:id', accion_path + '.probar')
}).prefix('api/v1')