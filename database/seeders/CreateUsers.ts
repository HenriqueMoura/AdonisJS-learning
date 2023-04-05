import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { userRoles } from 'App/Utils/Enum /Roles'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'secret',
        genre: 'masculino',
        role: userRoles.admin,
      },
      {
        name: 'User',
        email: 'user@user.com',
        password: 'secret',
        genre: 'feminino',
        role: userRoles.normal,
      },
    ])
  }
}
