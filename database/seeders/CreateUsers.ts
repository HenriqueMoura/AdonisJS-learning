import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name:'Admin',
        email: 'admin@admin.com',
        password: 'secret',
        role:'admin'
      },
      {
        name:'User',
        email: 'user@user.com',
        password: 'secret',
        role:'normal'
      },
    ])
  }
}
