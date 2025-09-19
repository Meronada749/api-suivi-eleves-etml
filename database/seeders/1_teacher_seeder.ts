import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TeacherFactory } from '#database/factories/teacher_factory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    // Crée 10 étudiants
    await TeacherFactory.createMany(10)
  }
}
