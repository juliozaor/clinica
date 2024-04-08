import { FuncionalidadDto } from "./FuncionalidadDto"
import { Modulo } from "App/Dominio/Datos/Entidades/Autorizacion/Modulo"

export class ModuloDto{
    public id: string
    public nombre: string
    public ruta: string
    public icono: string
    public parent: number
    public parametro: string
    public funcionalidad: FuncionalidadDto[]

    constructor(modulo: Modulo){
        this.id = modulo.id
        this.nombre = modulo.nombreMostrar
        this.ruta = modulo.ruta
        this.parametro = modulo.parametro
        this.parent = modulo.parent
        this.icono = modulo.icono
        this.funcionalidad = modulo.funcionalidad.map( funcionalidad => new FuncionalidadDto(funcionalidad))
    }
}