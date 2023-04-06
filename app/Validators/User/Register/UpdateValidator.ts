import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    key: schema.string({ trim: true }, [rules.exists({ table: 'user_keys', column: 'key' })]),
    name: schema.string({ trim: true }),
    password: schema.string({ trim: true }, [rules.confirmed('passwordConfirmation')]),
    phone: schema.string({ trim: true }),
    birthDate: schema.date({ format: 'dd-MM-yyyy' }),
    cpf: schema.string({ trim: true }),
    rg: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
