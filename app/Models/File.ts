import Env from '@ioc:Adonis/Core/Env'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { FileCategory } from 'App/Utils/Enum /fileCategories'
import { DateTime } from 'luxon'
export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public FileCategory: FileCategory

  @column({ serializeAs: null })
  public fileName: string

  @column({ serializeAs: null })
  public ownerId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get url(): string {
    return `${Env.get('APP_URL')}/uploads/${this.fileName}`
  }
}
