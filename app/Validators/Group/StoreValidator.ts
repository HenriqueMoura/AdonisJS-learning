import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    project_id: schema.number([rules.exists({ table: 'projects', column: 'id' })]),
    name: schema.string.optional({}, [rules.maxLength(20)]),
  })

  public messages: CustomMessages = {}
}
