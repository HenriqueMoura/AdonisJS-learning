import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Group, GroupStudent, Project } from 'App/Models'
import { generateCode } from 'App/Utils/groupCodeGenerator'
import { StoreValidator } from 'App/Validators/Group'

export default class MainsController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, params, auth }: HttpContextContract) {
    const user = auth.user!
    const data = await request.validate(StoreValidator)
    const pathName = params.pathName

    const project = await Project.query()
      .where('pathName', pathName)
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

    const group = await Group.create({
      name: data.name ? data.name : `Grupo de ${user.name}`,
      projectId: data.project_id,
      GroupCode: generateCode(),
      ownerId: !userHasGroup,
    })

    await GroupStudent.create({
      projectId: data.project_id,
      groupId: group.id,
      userId: user.id,
    })

    return response.status(201).json(group)
  }
  public async show({ request, response, auth, params }: HttpContextContract) {
    const user = auth.user!

    const pathName = params.pathName

    const project = await Project.query()
      .where('pathName', pathName)
      .preload('groupStudents', (query) => {
        query.where('user_id', user.id)
      })

    return response.ok(project)
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
