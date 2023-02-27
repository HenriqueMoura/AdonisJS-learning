import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Groups extends BaseSchema {
  protected tableName = 'groups'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('group_code', 7).unique()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.boolean('owner_id').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
