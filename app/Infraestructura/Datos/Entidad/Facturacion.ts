import { BaseModel, HasMany, HasOne, column, hasMany, hasOne} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import { TblEstados } from './Estados';
import { TblDetalles } from './Detalles';
import { Factura } from 'App/Dominio/Datos/Entidades/factura';

export class TblFacturacion extends BaseModel {
  public static readonly table = 'BOTF_FACTURACION'
 @column({ columnName: 'RUT_PAC' }) public RUT_PAC: string
 @column({ columnName: 'COD_CONVENIO' }) public COD_CONVENIO: string
 @column({ columnName: 'CONVENIO' }) public CONVENIO: string
 @column({ columnName: 'AMBITO' }) public AMBITO: string
 @column({ columnName: 'RPA_FOR_FECHADIGIT' }) public RPA_FOR_FECHADIGIT: string
 @column({ columnName: 'RPA_FOR_NUMERFORMU' }) public RPA_FOR_NUMERFORMU: string
 @column({ columnName: 'RPA_FOR_FECHATENCION' }) public RPA_FOR_FECHATENCION: string
 @column({ columnName: 'VALORCTA' }) public VALORCTA: number
 @column({ columnName: 'CODIGOCENTROATEN' }) public CODIGOCENTROATEN: string
 @column({ columnName: 'fcarga' }) public fcarga: string
 @column({ columnName: 'estadoId' }) public estadoId: number
 @column({ columnName: 'fultestado' }) public fultestado: string
 @column({ columnName: 'fanalizarinfo' }) public fanalizarinfo: string
 @column({ columnName: 'uanalizarinfo' }) public uanalizarinfo: number
 @column({ columnName: 'fescalargestion' }) public fescalargestion: string
 @column({ columnName: 'uescalargestion' }) public uescalargestion: number
 @column({ columnName: 'fmarcarprestacion' }) public fmarcarprestacion: string
 @column({ columnName: 'umarcarprestacion' }) public umarcarprestacion: number
 @column({ columnName: 'fenviobot' }) public fenviobot: string
 @column({ columnName: 'descbot' }) public descbot: string
 @column({ columnName: 'nfactura' }) public nfactura: string

 @column({ columnName: 'RPA_FOR_TIPOFORMU' }) public RPA_FOR_TIPOFORMU: string
 @column({ columnName: 'RPA_FOR_NUMERFORMU_PID' }) public RPA_FOR_NUMERFORMU_PID: string
 @column({ columnName: 'TIPO' }) public TIPO: string
 @column({ columnName: 'NOM_PAC' }) public NOM_PAC: string
 @column({ columnName: 'EMPRESA' }) public EMPRESA: string
 @column({ columnName: 'RPA_FOR_ETDCTA' }) public RPA_FOR_ETDCTA: string
 @column({ columnName: 'RPA_FOR_VIGENCIA' }) public RPA_FOR_VIGENCIA: string


 

 public obtenerFormulario (): Factura {
  const formulario = new Factura()
  formulario.RUT_PAC = this.RUT_PAC
  formulario.COD_CONVENIO = this.COD_CONVENIO
  formulario.CONVENIO = this.CONVENIO
  formulario.AMBITO = this.AMBITO
  formulario.RPA_FOR_FECHADIGIT = this.RPA_FOR_FECHADIGIT
  formulario.RPA_FOR_NUMERFORMU = this.RPA_FOR_NUMERFORMU
  formulario.RPA_FOR_FECHATENCION = this.RPA_FOR_FECHATENCION
  formulario.VALORCTA = this.VALORCTA
  formulario.CODIGOCENTROATEN = this.CODIGOCENTROATEN
  formulario.fcarga = this.fcarga
  formulario.estadoId = this.estadoId
  formulario.fultestado = this.fultestado
  formulario.fanalizarinfo = this.fanalizarinfo
  formulario.uanalizarinfo = this.uanalizarinfo
  formulario.fescalargestion = this.fescalargestion
  formulario.uescalargestion = this.uescalargestion
  formulario.fmarcarprestacion = this.fmarcarprestacion
  formulario.umarcarprestacion = this.umarcarprestacion
  formulario.fenviobot = this.fenviobot
  formulario.descbot = this.descbot
  formulario.nfactura = this.nfactura
  formulario.RPA_FOR_TIPOFORMU = this.RPA_FOR_TIPOFORMU
  formulario.RPA_FOR_NUMERFORMU_PID = this.RPA_FOR_NUMERFORMU_PID
  formulario.TIPO = this.TIPO
  formulario.NOM_PAC = this.NOM_PAC
  formulario.EMPRESA = this.EMPRESA
  formulario.RPA_FOR_ETDCTA = this.RPA_FOR_ETDCTA
  formulario.RPA_FOR_VIGENCIA = this.RPA_FOR_VIGENCIA
  formulario.estado = this.estado

  return formulario
}
 
 @hasOne( ()=> TblEstados, {
 localKey:'estadoId',
 foreignKey: 'id'
 })
 public estado: HasOne<typeof TblEstados>

 @hasMany( ()=> TblDetalles,{
  localKey:'RPA_FOR_NUMERFORMU',
 foreignKey: 'RPA_FOR_NUMERFORMU'
 })
 public detalles: HasMany<typeof TblDetalles>

}


