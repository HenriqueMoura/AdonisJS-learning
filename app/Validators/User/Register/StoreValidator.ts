import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { userGenre } from 'App/Utils/Enum /UserGenre'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    genre: schema.enum(userGenre),
    redirectUrl: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
