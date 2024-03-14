import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tbl_logs_forms";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable().unique().primary()
      table.string("usuario");
      table.string("rol");
      table.string("rpa_for_numerformu");
      table.integer("accion_id").comment('identificador del boton ejecutado');
      table.integer("estado").comment('Estdo con el que se actualiza')
      table.timestamp('creacion', { useTz: true }).defaultTo(this.now())
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
