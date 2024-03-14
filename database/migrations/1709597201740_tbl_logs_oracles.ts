import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_logs_oracles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable().unique().primary()
      table.string("accion")
      table.string("estado")
      table.timestamp('creacion', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
