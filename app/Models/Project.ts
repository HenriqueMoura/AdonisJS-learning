import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Group } from 'App/Models'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @computed()
  public get pathName(): string{ 
    const kebabCase = require('lodash.kebabcase')
    return kebabCase(this.name)
  }

  @column()
  public maxGroups: number

  @column()
  public maxUserPerGroup: number

  @hasMany(() => Group)
  public Group: HasMany<typeof Group>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
