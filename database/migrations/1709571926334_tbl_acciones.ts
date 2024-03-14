import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tbl_acciones";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("id").primary();
      table.string("accion");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
