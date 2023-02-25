import { BaseModel, BelongsTo, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import {User, Group} from 'App/Models'

export default class GroupStudent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public projectId: number

  @column()
  public groupId: number

  @column()
  public userId: number


  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
