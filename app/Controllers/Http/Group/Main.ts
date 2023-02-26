import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Group, GroupStudent, Project } from 'App/Models'
import { StoreValidator } from 'App/Validators/Group'

export default class MainsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const user = auth.user!
    const data = await request.validate(StoreValidator)
    const project = await Project.query()
      .where('id', data.project_id)
      .preload('groups', (query) => {
        query.select('id')
      })
      .firstOrFail()

    if (project.groups.length >= project.maxGroups) {
      return response.badRequest({
        message: 'O projeto já atingiu o limite máximo de grupos.',
      })
    }

    const userHasGroup = await GroupStudent.query()
      .where('user_id', user.id)
      .whereHas('group', (query) => {
        query.where('project_id', data.project_id)
      })
      .first()

    if (userHasGroup) {
      return response.badRequest({
        message: 'Você já está em um grupo para esse projeto',
      })
    }

    const group = new Group()
    group.name = data.name
    group.projectId = data.project_id
    group.ownerId = !userHasGroup
    await group.save()

    const groupStudent = new GroupStudent()
    groupStudent.projectId = data.project_id
    groupStudent.groupId = group.id
    groupStudent.userId = user.id
    await groupStudent.save()

    return response.status(201).json(group)
  }
  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
