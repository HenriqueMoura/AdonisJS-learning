import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class ShowValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'projects', column: 'id' })]),
  })

  public messages = {
    'id.required': 'O id é obrigatório',
    'id.exists': 'O projeto não existe',
  }
}