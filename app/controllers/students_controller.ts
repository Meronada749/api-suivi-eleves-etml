import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await Student.query().orderBy('name').orderBy('firstname')
  }

  /**
   * Ajouter d'un élève
   * POST /students
   * INSERT INTO students (name, firstname, age) VALUES ('Doe', 'John', 20);
   */
  async store({ request }: HttpContext) {
    // Récupération des données envoyées par le client
    // On utilise `request.only` pour ne récupérer que les champs nécessaires
    const student = request.only(['name', 'firstname'])
    // Création d'un nouvel élève avec les données récupérées
    return await Student.create(student)
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
    const data = request.only(['name', 'firstname'])
    // Vérification de l'existence de l'élève
    const student = await Student.findOrFail(params.id)
    // Mise à jour des données de l'élève
    student.merge(data)
    // Sauvegarde des modifications
    await student.save()
    // Retour le json de l'élève mis à jour
    return student
  }

  /**
   * Edit individual record
   */
  //async edit({ params }: HttpContext) {}

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
