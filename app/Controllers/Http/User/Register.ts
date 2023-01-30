import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'
import { faker } from '@faker-js/faker'

export default class UserRegistersController {

  public async store({request}: HttpContextContract) {
    const { email, redirectUrl} =  await request.validate(StoreValidator)

    const user =  await User.create({email})
    await user.save()

    const key = faker.datatype.uuid() + new Date().getTime()
      user.related('key').create({key})
    const link = `${redirectUrl.replace(/\$/, '')}/${key}`
    
    return link
  }
  
  public async show({}: HttpContextContract) {}
  public async update({}: HttpContextContract) {}
}
