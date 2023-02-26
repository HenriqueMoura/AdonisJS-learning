import { BaseModel, BelongsTo, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import {User, Group, Project} from 'App/Models'

export default class GroupStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public projectId: number

  @column()
  public groupId: number

  @column()
  public userId: number

  @belongsTo(() => Project, { foreignKey: 'projectId' })
  public project: BelongsTo<typeof Project>

  @belongsTo(() => Group, { foreignKey: 'groupId' })
  public group: BelongsTo<typeof Group>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
