import { DateTime } from 'luxon'
import ClassGroup from './class_group.js'
import { BaseModel, hasMany, column } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare firstname: string

  @column()
  declare email: string

  // Relation : teacher → class
  @hasMany(() => ClassGroup)
  declare classGroups: HasMany<typeof ClassGroup>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
