import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { rolesArray } from 'App/Utils/Enum /Roles'
import { userGenre } from 'App/Utils/Enum /UserGenre'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username').unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180)
      table.string('phone')
      table.string('name')
      table.date('birth_date')
      table.string('CPF')
      table.string('RG')
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('genre', userGenre).notNullable()
      table.enum('role', rolesArray).notNullable().defaultTo('normal')
      table.string('remember_me_token').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
