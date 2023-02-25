import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Group, GroupStudent } from 'App/Models'
import { StoreValidator } from 'App/Validators/Group'

export default class MainsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const user = auth.user!.useTransaction(trx)
      const data = await request.validate(StoreValidator)

      const userHasGroup = await GroupStudent.findBy('user_id', user.id)
      
      if(userHasGroup) {
        return response.badRequest({ message: 'Você já está em um grupo' })
      }

      const group = new Group()
      group.name = data.name
      group.projectId = data.project_id
      group.ownerId = user.id

      group.useTransaction(trx)


      // Associa o usuário que criou o grupo a ele
      await GroupStudent.create({ groupId: group.id, userId: user.id })
      
      await group.save()

      return response.status(201).json(group)
    })
  }
  
  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
