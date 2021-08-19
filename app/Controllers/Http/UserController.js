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
  }
}

module.exports = UserController
