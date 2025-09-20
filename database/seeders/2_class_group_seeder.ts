import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Teacher from '#models/teacher'
import ClassGroup from '#models/class_group'

export default class extends BaseSeeder {
  async run() {
    // Récupération des enseignants
    const teachers = await Teacher.all()

    await ClassGroup.createMany([
      {
        name: 'CIN1A',
        teacherId: teachers[0].id,
      },
      { name: 'CIN1B', teacherId: teachers[0].id },
      { name: 'CIN1C', teacherId: teachers[1].id },
      { name: 'FID1', teacherId: teachers[1].id },
      { name: 'FID2', teacherId: teachers[2].id },
      { name: 'CID2A', teacherId: teachers[2].id },
      { name: 'CID2B', teacherId: teachers[3].id },
    ])
  }
}
