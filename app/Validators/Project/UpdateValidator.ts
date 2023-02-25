import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'projects', column: 'id' })]),

    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),

    maxGroups: schema.number([
      rules.minLength(1),
      rules.maxLength(100),
    ]),
    
    maxUsersPerGroup: schema.number([
      rules.minLength(1),
      rules.maxLength(50),
    ]),
  })

  public messages: CustomMessages = {
    'id.exists': 'O projeto não existe',
    'name.required': 'O nome do projeto é obrigatório',
    'name.minLength': 'O nome do projeto deve ter pelo menos 3 caracteres',
    'name.maxLength': 'O nome do projeto deve ter no máximo 255 caracteres',
    'maxGroups.required': 'O número máximo de grupos é obrigatório',
    'maxGroups.min': 'O número máximo de grupos deve ser pelo menos 1',
    'maxGroups.max': 'O número máximo de grupos deve ser no máximo 100',
    'maxUsersPerGroup.required': 'O número máximo de usuários por grupo é obrigatório',
    'maxUsersPerGroup.min': 'O número máximo de usuários por grupo deve ser pelo menos 1',
    'maxUsersPerGroup.max': 'O número máximo de usuários por grupo deve ser no máximo 50',
  }
}
