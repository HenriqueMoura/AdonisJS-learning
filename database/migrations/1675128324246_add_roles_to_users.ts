import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'add_roles_to_users'

  public async up () {
    this.schema.table('users', (table) => {
      table.enum('role', ['admin', 'user', 'teacher' ,'viewer']).notNullable().defaultTo('user')
    })
  }

  public async down () {
    this.schema.table('users', (table) => {
      table.dropColumn('role')
    })
  }
}
