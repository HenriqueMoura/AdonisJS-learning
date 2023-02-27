import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3)]),
    description: schema.string({}, [rules.minLength(3)]),
    maxGroups: schema.number([rules.range(1, 100)]),
    maxUserPerGroup: schema.number([rules.range(1, 50)]),
  })

  public messages: CustomMessages = {
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
