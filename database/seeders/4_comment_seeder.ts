import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Teacher from '#models/teacher'
import Student from '#models/student'
import Comment from '#models/comment'

export default class extends BaseSeeder {
  async run() {
    // On récupère un élève et un enseignant existants
    const student = await Student.findOrFail(1)
    const teacher = await Teacher.findOrFail(1)

    await Comment.createMany([
      {
        content: 'Très bon travail sur le dernier trimestre.',
        studentId: student.id,
        teacherId: teacher.id,
      },
      {
        content: 'En constante amélioration !',
        studentId: student.id,
        teacherId: teacher.id,
      },
    ])
  }
}
