import Comment from '#models/comment'
import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { commentValidator } from '#validators/comment'

export default class CommentsController {
  async index({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.student_id)
    await student.load('comments', (query) => {
      query.preload('teacher')
    })
    return response.ok(student.comments)
  }

  async store({ params, request, response }: HttpContext) {
    const { content } = await request.validateUsing(commentValidator)
    const teacherId = 1
    const comment = await Comment.create({
      content,
      studentId: params.student_id,
      teacherId,
    })
    return response.created(comment)
  }

  async show({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .preload('teacher')
      .firstOrFail()
    return response.ok(comment)
  }

  async update({ params, request, response }: HttpContext) {
    const { content } = await request.validateUsing(commentValidator)
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()
    comment.content = content
    await comment.save()
    return response.ok(comment)
  }

  async destroy({ params, response }: HttpContext) {
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()

    await comment.delete()

    return response.noContent()
  }
}
