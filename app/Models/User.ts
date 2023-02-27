import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { File, Project, UserKey } from 'App/Models'
import { UserRole } from 'App/Utils/Roles'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column()
  public role: UserRole

  @hasMany(() => Project)
  public projects: HasMany<typeof Project>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => UserKey)
  public key: HasMany<typeof UserKey>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'avatar' }),
  })
  public avatar: HasOne<typeof File>
}
