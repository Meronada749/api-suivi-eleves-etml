import ClassGroup from '#models/class_group'
import type { HttpContext } from '@adonisjs/core/http'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  /**
   * Display a list of resource
   *
   *  HTTP GET /class-groups
   */
  async index({ response }: HttpContext) {
    const class_group = await ClassGroup.query().preload('teacher').orderBy('name', 'asc')
    return response.ok(class_group)
  }

  /**
   * Handle form submission for the create action
   *
   * HTTP POST /class-groups + json
   */
  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(classGroupValidator)
    const class_group = await ClassGroup.create({ name })
    return response.created(class_group)
  }

  /**
   * Show individual record
   *
   * HTTP GET /class-groups/:id
   */
  async show({ params, response }: HttpContext) {
    const class_group = await ClassGroup.query()
      .preload('teacher')
      .where('id', params.id)
      .firstOrFail()

    return response.ok(class_group)
  }

  /**
   * Handle form submission for the edit action
   *
   * HTTP PUT or PATCH /class-groups/:id + json
   */
  async update({ params, request }: HttpContext) {
    const { name, teacherId } = await request.validateUsing(classGroupValidator)
    const class_group = await ClassGroup.query()
      .preload('teacher')
      .where('id', params.id)
      .firstOrFail()
    class_group.merge({ name, teacherId })
    await class_group.save()
    return class_group
  }

  /**
   * Delete record
   *
   * HTTP DELETE /class-groups/:id
   */
  async destroy({ params }: HttpContext) {
    const class_group = await ClassGroup.findOrFail(params.id)
    return await class_group.delete()
  }
}
