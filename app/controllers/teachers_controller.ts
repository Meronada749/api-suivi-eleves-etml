import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { teacherValidator } from '#validators/teacher'

export default class TeachersController {
  async index({ response }: HttpContext) {
    const teachers = await Teacher.query().orderBy('name').orderBy('firstname').orderBy('email')
    return response.ok(teachers)
  }

  async store({ request, response }: HttpContext) {
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.create({ name, firstname, email })
    return response.created(teacher)
  }

  async show({ params }: HttpContext) {
    return await Teacher.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.findOrFail(params.id)
    teacher.merge({ name, firstname, email })
    await teacher.save()
    return teacher
  }

  async destroy({ params }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    return await teacher.delete()
  }
}
