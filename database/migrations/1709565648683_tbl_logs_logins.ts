import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_logs_logins'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable().unique().primary()
      table.string("usuario")
      table.string("estado_login").comment('exitoso - fallido')
      table.string("mensaje_error")
      table.timestamp('creacion', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}