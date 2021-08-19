'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.post('password', 'ForgotPasswordController.store')
Route.put('reset_password', 'ForgotPasswordController.update')
