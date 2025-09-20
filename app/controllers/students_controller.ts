import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator } from '#validators/student'

export default class StudentsController {
  async index({ response }: HttpContext) {
    const students = await Student.query().orderBy('name').orderBy('firstname')
    return response.ok(students)
  }

  async store({ request, response }: HttpContext) {
    const { name, firstname } = await request.validateUsing(studentValidator)
    const student = await Student.create({ name, firstname })
    return response.created(student)
  }

  async show({ params }: HttpContext) {
    return await Student.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const { name, firstname } = await request.validateUsing(studentValidator)
    const student = await Student.findOrFail(params.id)
    student.merge({ name, firstname })
    await student.save()
    return student
  }

  async destroy({ params }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    return await student.delete()
  }
}
