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
      project.maxUserPerGroup = data.maxUsersPerGroup

      await project.save()
      return response.created(project)

    })
  }

  public async show({request, response}: HttpContextContract) {
    const project = await Project.findOrFail(request.param('id'))
    return response.ok(project)
  }

  public async edit({}: HttpContextContract) {}

  public async update({request, response  }: HttpContextContract) {
    const project = await Project.findOrFail(request.param('id'))
    project.merge(request.only(['name', 'maxGroups', 'maxUserPerGroup']))
    await project.save()
    return response.ok(project)
  }

  public async destroy({}: HttpContextContract) {}
}