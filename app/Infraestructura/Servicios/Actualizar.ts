
export class ServicioActualizacion {  
   
  public obtenerKeys(boton:number): {usuario: string, fechaUsuario: string} {

    const datos: {
      usuario: string,
      fechaUsuario: string
    } = {
      usuario: '',
      fechaUsuario: '',
    };
    if(boton == 1 || boton == 2 || boton == 3){
      datos.usuario = 'uanalizarinfo'
      datos.fechaUsuario = 'fanalizarinfo'
    }
    if(boton == 4 || boton == 5 || boton == 6){
      datos.usuario = 'uescalargestion'
      datos.fechaUsuario = 'fescalargestion'
    }
    if(boton == 7 || boton == 8 || boton == 9){
      datos.usuario = 'umarcarprestacion'
      datos.fechaUsuario = 'fmarcarprestacion'
    }


    return datos
  }
}
