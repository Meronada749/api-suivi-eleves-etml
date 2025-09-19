import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { teacherValidator } from '#validators/teacher'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const teachers = await Teacher.query().orderBy('name').orderBy('firstname').orderBy('email')
    return response.ok(teachers)
  }

  // async store({ request, response }: HttpContext) {
  //   const student = request.only(['name', 'firstname'])
  //   const s = await Student.create(student)
  //   return response.created(s)
  // }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.create({ name, firstname, email })
    return response.created(teacher)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Teacher.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.only(['name', 'firstname', 'email'])
    const teacher = await Teacher.findOrFail(params.id)
    teacher.merge(data)
    await teacher.save()
    return teacher
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    return await teacher.delete()
  }
}
