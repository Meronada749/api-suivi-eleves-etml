import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'class_groups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
<<<<<<< Updated upstream:database/migrations/1757062882457_create_teachers_table.ts
      table.string('firstname').notNullable()
      table.string('email').notNullable().unique()
=======

      // Relation : 1 classe → 1 enseignant
      table
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('teachers')
        .onDelete('CASCADE')
>>>>>>> Stashed changes:database/migrations/4_create_class_groups_table.ts

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
