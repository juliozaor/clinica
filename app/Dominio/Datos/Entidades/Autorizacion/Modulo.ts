import { DateTime } from 'luxon'
import { Funcionalidad } from './Funcionalidad'

export class Modulo {
  private _funcionalidad:Funcionalidad[] = []

  constructor (
    private _id: string,
    private _nombre: string,
    private _nombreMostrar: string,
    private _ruta: string,
    private _icono: string,
    private _parametro: string,
    private _orden: number,
    private _estado: boolean = true,
    private _parent: number,
    private _creacion: DateTime = DateTime.now(),
    private _actualizacion:DateTime = DateTime.now(),
  ){}

  public get id (){
    return this._id
  }

  public get funcionalidad (){
    return this._funcionalidad
  }

  public get nombre (){
    return this._nombre
  }

  public get nombreMostrar (){
    return this._nombreMostrar
  }

  public get ruta (){
    return this._ruta
  }

  public get icono (){
    return this._icono
  }

  public get parametro (){
    return this._parametro
  }

  public get orden (){
    return this._orden
  }

  public get estado (){
    return this._estado
  }

  public get parent (){
    return this._parent
  }

  public get creacion (){
    return this._creacion
  }

  public get actualizacion (){
    return this._actualizacion
  }

  public agregarFuncionalidad (funcionalidad:Funcionalidad):Modulo{
    this._funcionalidad.push(funcionalidad)
    return this
  }
}
