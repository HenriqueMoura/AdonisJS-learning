import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GroupStudent extends BaseSchema {
  protected tableName = 'group_student'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('group_id').unsigned().references('id').inTable('groups')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
