import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3), rules.maxLength(255)]),
    description: schema.string(),
    maxUserPerGroup: schema.number([rules.range(1, 50)]),
    maxGroups: schema.number([rules.range(1, 100)]),
    projectCategories: schema.array().members(
      schema.object().members({
        id: schema.number.optional([rules.exists({ table: 'projects_categories', column: 'id' })]),
        name: schema.string({}, [rules.minLength(3), rules.maxLength(255)]),
        description: schema.string({}, [rules.minLength(3), rules.maxLength(255)]),
      })
    ),
  })

  public messages: CustomMessages = {
    'id.exists': 'O projeto não existe',
    'name.required': 'O nome do projeto é obrigatório',
    'name.minLength': 'O nome do projeto deve ter pelo menos 3 caracteres',
    'name.maxLength': 'O nome do projeto deve ter no máximo 255 caracteres',
    'maxGroups.required': 'O número máximo de grupos é obrigatório',
    'maxGroups.min': 'O número máximo de grupos deve ser pelo menos 1',
    'maxGroups.max': 'O número máximo de grupos deve ser no máximo 100',
    'maxUserPerGroup.required': 'O número máximo de usuários por grupo é obrigatório',
    'maxUserPerGroup.min': 'O número máximo de usuários por grupo deve ser pelo menos 1',
    'maxUserPerGroup.max': 'O número máximo de usuários por grupo deve ser no máximo 50',
  }
}
