import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Group, GroupStudent } from 'App/Models'
import { DateTime } from 'luxon'
import ProjectsCategory from './ProjectsCategory'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public maxGroups: number

  @column()
  public maxUserPerGroup: number

  @column()
  public description: string

  @column()
  public pathName: string

  @hasMany(() => Group)
  public groups: HasMany<typeof Group>

  @hasMany(() => GroupStudent)
  public groupStudents: HasMany<typeof GroupStudent>

  @hasMany(() => ProjectsCategory)
  public projectsCategory: HasMany<typeof ProjectsCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
