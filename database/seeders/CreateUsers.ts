import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { userRoles } from 'App/Utils/Roles'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name:'Admin',
        email: 'admin@admin.com',
        password: 'secret',
        role: userRoles[0]
      },
      {
        name:'User',
        email: 'user@user.com',
        password: 'secret',
        role: userRoles[1]
      },
    ])
  }
}
