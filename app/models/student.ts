import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ClassGroup from './class_group.js'
import Comment from './comment.js'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare firstname: string

  // Foreign key
  @column()
  declare classGroupId: number | null

  // Relation : 1 student → 1 class_group
  @belongsTo(() => ClassGroup)
  declare class_group: BelongsTo<typeof ClassGroup>

  // Relation : student → comment
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
