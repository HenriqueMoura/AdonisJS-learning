import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Project } from 'App/Models'
import { userRoles } from 'App/Utils/Roles'
import { StoreValidator, UpdateValidator } from 'App/Validators/Project'
import kebabCase from 'lodash.kebabcase'

export default class MainsController {
  public async store({ request, response, auth }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const data = await request.validate(StoreValidator)
      const project = new Project()

      project.useTransaction(trx)

      project.name = data.name
      project.maxGroups = data.maxGroups
      project.maxUserPerGroup = data.maxUserPerGroup
      project.pathName = await kebabCase(data.name)

      await project.save()
      return response.created(project)
    })
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const project = await Project.findOrFail(params.id)
      return response.ok(project)
      
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Projeto não encontrado' })
      }
      throw error
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const project = await Project.findOrFail(request.param('id'))
      project.merge(data)
      await project.save()
      return response.ok(project)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Projeto não encontrado' })
      }
      throw error
    }
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    try {
      const project = await Project.findOrFail(request.param('id'))

      // Verifica se o usuário e administrador
      if (auth.user?.role.includes(userRoles.admin)) {
        await project.delete()
        return response.noContent()
      }
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Projeto não encontrado' })
      }
      throw error
    }
  }
}
