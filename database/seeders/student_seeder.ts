import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StudentFactory } from '#database/factories/student_factory'

export default class StudentSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    // Crée 10 étudiants
    await StudentFactory.createMany(10)
  }
}
