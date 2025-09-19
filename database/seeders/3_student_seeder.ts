import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StudentFactory } from '#database/factories/student_factory'
import ClassGroup from '#models/class_group'

export default class StudentSeeder extends BaseSeeder {
  public async run() {
    const classGroups = await ClassGroup.all()

    if (classGroups.length === 0) {
      console.warn('No class groups found. Please run the ClassGroup seeder first.')
      return
    }

    for (const group of classGroups) {
      await StudentFactory.merge({ classGroupId: group.id }).createMany(10)
    }
  }
}
