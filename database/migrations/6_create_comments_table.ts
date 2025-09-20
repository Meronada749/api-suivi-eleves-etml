import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('content').notNullable()

      // Relation : 1 comment → 1 teacher
      table
        .integer('teacher_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('teachers')
        .onDelete('SET NULL')

      // Relation : 1 comment → 1 student
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
