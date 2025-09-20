import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Student from './student.js'
import Teacher from './teacher.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  // Foreign key
  @column()
  declare studentId: number

  // Foreign key
  @column()
  declare teacherId: number

  // Relation : 1 comment → 1 student
  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  // Relation : 1 comment → 1 teacher
  @belongsTo(() => Teacher)
  declare teacher: BelongsTo<typeof Teacher>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
