import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string.optional({ trim: true }),
    name: schema.string.optional({ trim: true }),
    password: schema.string.optional({ trim: true }, [rules.confirmed('passwordConfirmation')]),
  })

  public messages: CustomMessages = {}
}
