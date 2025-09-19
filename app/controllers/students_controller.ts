import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'
import { studentValidator } from '#validators/student'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const students = await Student.query().orderBy('name').orderBy('firstname')

    // Retourne un statut HTTP 200
    return response.ok(students)
  }

  /**
   * Ajouter d'un élève
   */
  // async store({ request, response }: HttpContext) {
  //   // Récupération des données envoyées par le client
  //   // On utilise `request.only` pour ne récupérer que les champs nécessaires
  //   const student = request.only(['name', 'firstname'])
  //   // Création d'un nouvel élève avec les données récupérées
  //   const s = await Student.create(student)
  //   return response.created(s)
  // }

  /**
   * Ajouter d'un élève
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { name, firstname } = await request.validateUsing(studentValidator)
    // Création d'un nouvel élève avec les données validées
    const student = await Student.create({ name, firstname })
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève créé
    return response.created(student)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Student.findOrFail(params.id)
  }

  /**
   * Mettre à jour un élève
   *
   * Cette méthode est utilisée pour mettre à jour les informations d'un élève que ce soit :
   * - pour une modification complète (PUT)
   * - ou une modification partielle (PATCH)
   */
  async update({ params, request }: HttpContext) {
    // Récupération des données
    const { name, firstname } = await request.validateUsing(studentValidator)

    // Vérification de l'existence de l'élève
    const student = await Student.findOrFail(params.id)

    const data = { name, firstname }

    // Mise à jour des données de l'élève
    student.merge(data)

    // Sauvegarde des modifications
    await student.save()

    // Retour le json de l'élève mis à jour
    return student
  }

  /**
   * Supprimer un élève
   */
  async destroy({ params }: HttpContext) {
    // Vérification de l'existence de l'élève
    const student = await Student.findOrFail(params.id)
    // Suppression de l'élève
    return await student.delete()
  }
}

//{ params, response }: HttpContext
//{ request, response }: HttpContext
