import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "BOTF_causal";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer("id");
      table.string("nombre", 50);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
