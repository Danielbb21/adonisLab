'use strict'

const User = use('App/Models/User');
const Database = use('Database');

class UserController {

  async store({ request }) {
    const data = request.only(['username', 'email', 'password']);
    const adrresses = request.input('addresses');
    console.log(adrresses);
    const trx = await Database.beginTransaction();

    const user = await User.create(data, trx);
    console.log(user.addresses());
    await user.addresses().createMany(adrresses, trx);

    await trx.commit();
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
