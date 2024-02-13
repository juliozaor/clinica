import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tbl_roles_modulos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('rom_id').primary()
      table.string('rom_rol_id',5).references('rol_id').inTable('tbl_roles')
      table.string('rom_modulo_id',5).references('mod_id').inTable('tbl_modulos')
      table.timestamp('rom_creado', { useTz: true }).defaultTo(this.now())
      table.timestamp('rom_actualizado', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
