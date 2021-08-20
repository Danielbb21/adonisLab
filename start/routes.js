'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User');
Route.post('session', 'SessionController.store').validator('Session')
Route.post('password', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('reset_password', 'ForgotPasswordController.update').validator('ResetPassword')
Route.get('users/list', 'UserController.index')
Route.get('upload/:id', 'FileController.show');

Route.group(() => {

  Route.post('upload', 'FileController.store');

  Route.resource('projects', 'ProjectController').apiOnly().validator(
    new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ]
      ]
    )
  )
  Route.resource('projects.tasks', 'TaskController').apiOnly().validator(
    new Map(
      [
        [
          ['projects.tasks.store'],
          ['Project']
        ]
      ]
    )
  )
}).middleware(['auth'])
