'use strict'

const User = use('App/Models/User');

class UserController {

  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);
    const user = await User.create(data);
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    return user;
  } async index({ request, response }) {
    try {
      const users = await User.all()
      return users;
    }
    catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController
