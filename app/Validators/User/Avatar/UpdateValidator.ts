import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
  })

  public messages: CustomMessages = {}
}
