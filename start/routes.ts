/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import StudentsController from '#controllers/students_controller'
import TeachersController from '#controllers/teachers_controller'
import ClassGroupsController from '#controllers/class_groups_controller'

router.get('test', async () => {
  return 'API is working!'
})

router.resource('students', StudentsController).apiOnly()
router.resource('teachers', TeachersController).apiOnly()
router.resource('class_groups', ClassGroupsController).apiOnly()

/* est équivalent à : 
router
  .group(() => {
    router.get('', [StudentsController, 'index'])
    router.get(':id', [StudentsController, 'show'])
    router.post('', [StudentsController, 'store'])
    router.put(':id', [StudentsController, 'update'])
    router.patch(':id', [StudentsController, 'update'])
    router.delete(':id', [StudentsController, 'destroy'])
  })
  .prefix('students')
  */
