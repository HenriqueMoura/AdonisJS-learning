import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Project } from 'App/Models'
import { StoreValidator } from 'App/Validators/Project'

export default class MainsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const data = await request.validate(StoreValidator)
      const project = new Project()

      project.useTransaction(trx)

      project.name = data.name
      project.maxGroups = data.maxGroups
      project.maxUsersPerGroup = data.maxUsersPerGroup

      await project.save()
      return response.created(project)
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
