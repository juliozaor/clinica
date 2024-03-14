import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Env from '@ioc:Adonis/Core/Env';


export default class ApiKeyAuth {
  public async handle ({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // Obtener el apiKey de la cabecera de la solicitud
    const apiKey = request.header('Api-Key')
    const allowedApiKeys = Env.get('APIKEY');
    
    // Verificar si el apiKey proporcionado está en la lista de apiKey permitidos
    if (!apiKey || !allowedApiKeys.includes(apiKey)) {
      return response.unauthorized({ error: 'Invalid API key' })
    }

    // Llamar al siguiente middleware o controlador si el apiKey es válido
    await next()
  }

}
