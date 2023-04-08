import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Project } from 'App/Models'
import ProjectsCategory from 'App/Models/ProjectsCategory'
import { userRoles } from 'App/Utils/Enum /Roles'
import { StoreValidator, UpdateValidator } from 'App/Validators/Project'
import kebabCase from 'lodash.kebabcase'

export default class MainsController {
  public async store({ request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { name, maxGroups, maxUserPerGroup, description, projectCategories } =
          await request.validate(StoreValidator)
        const project = new Project()

        project.useTransaction(trx)
        project.name = name
        project.description = description
        project.maxGroups = maxGroups
        project.maxUserPerGroup = maxUserPerGroup
        project.pathName = await kebabCase(name)

        for (const category of projectCategories) {
          const projectsCategory = new ProjectsCategory()

          projectsCategory.useTransaction(trx)
          projectsCategory.name = category.name
          projectsCategory.description = category.description

          await projectsCategory.related('project').associate(project)
          await projectsCategory.save()

          projectsCategory.projectId = project.id
        }

        return response.created([project, projectCategories])
      } catch (error) {
        console.error(error)
        return response.status(500).send({ error: 'Ocorreu um erro ao salvar o projeto.' })
      }
    })
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const project = await Project.findByOrFail('pathName', params.path)
      await project.load('projectsCategory')
      return response.ok(project)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Projeto não encontrado' })
      }
      throw error
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      try {
        const { name, maxGroups, maxUserPerGroup, description, projectCategories } =
          await request.validate(UpdateValidator)

        const project = await Project.findByOrFail('pathName', params.path)

        project.useTransaction(trx)
        project.name = name
        project.description = description
        project.maxGroups = maxGroups
        project.maxUserPerGroup = maxUserPerGroup
        project.pathName = await kebabCase(name)

        // Get existing project categories
        const existingCategories = await project.related('projectsCategory').query()

        // Compare existing and new categories
        const newCategoryNames = projectCategories.map((category) => category.name)
        const existingCategoriesById = existingCategories.reduce((result, category) => {
          result[category.id] = category
          return result
        }, {})
        const updatedCategories = []
        const addedCategories = []
        const removedCategoryIds = []

        for (const newCategory of projectCategories) {
          const existingCategory = existingCategoriesById[newCategory.id]

          if (!existingCategory) {
            // Category was added
            const projectsCategory = new ProjectsCategory()

            projectsCategory.useTransaction(trx)
            projectsCategory.name = newCategory.name
            projectsCategory.description = newCategory.description

            await projectsCategory.save()
            await projectsCategory.related('project').associate(project)

            addedCategories.push(projectsCategory)
          } else if (
            existingCategory.name !== newCategory.name ||
            existingCategory.description !== newCategory.description
          ) {
            // Category was updated
            existingCategory.useTransaction(trx)
            existingCategory.name = newCategory.name
            existingCategory.description = newCategory.description

            await existingCategory.save()

            updatedCategories.push(existingCategory)
          }
        }

        for (const existingCategory of existingCategories) {
          if (!newCategoryNames.includes(existingCategory.name)) {
            // Category was removed
            removedCategoryIds.push(existingCategory.id)
          }
        }

        // Remove all existing project categories that were removed
        await project.related('projectsCategory').query().whereIn('id', removedCategoryIds).delete()

        // Reload categories to get updated information
        await project.load('projectsCategory')

        // Merge updated and added categories with existing categories
        const mergedCategories = [
          ...updatedCategories,
          ...addedCategories,
          ...project.projectsCategory,
        ]

        // Update project categories on the project
        ;(await project.related('projectsCategory').query()).push(...mergedCategories)
        await project.save()

        return response.ok(project)
      } catch (error) {
        console.error(error.messages)
        return response.status(500).send({ error: 'Ocorreu um erro ao atualizar o projeto.' })
      }
    })
  }

  public async destroy({ auth, response, params }: HttpContextContract) {
    try {
      const project = await Project.findByOrFail('pathName', params.path)

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
