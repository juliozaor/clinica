import { Funcionalidad } from "App/Dominio/Datos/Entidades/Autorizacion/Funcionalidad"

export class FuncionalidadDto{
    public id: string
    public nombre: string
    public estado: boolean

    constructor(funcionalidad: Funcionalidad){
        this.id = funcionalidad.id
        this.nombre = funcionalidad.nombre
        this.estado = funcionalidad.estado
    }
}