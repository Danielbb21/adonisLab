'use strict'
const crypto = require('crypto');
const User = use('App/Models/User')
const Mail = use('Mail')
const moment = require('moment')

class ForgotPasswordController {

  async store({ request, response }) {
    const cry = crypto.randomBytes(10).toString('hex');
    console.log(cry);
    try {
      const email = request.input('email');

      const user = await User.findByOrFail('email', email);

      // console.log('user', user);
      user.token = cry;
      user.token_created_at = new Date();
      await user.save();
      await Mail.send(
        ['emails.forgot_password', 'emails.forgot_password-text'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        message => {
          message
            .to(user.email)
            .from('daniel@teste.com', 'Daniel |Teste')
            .subject('Recuperação de senha')
        }
      )

    }
    catch (err) {
      console.log(err.message);
      return response.status(err.status).send({ error: 'Sommeting went wrong' })
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();
      const user = await User.findByOrFail('token', token);
      console.log(moment(), user);
      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at);
      console.log(tokenExpired);
      if (tokenExpired) {
        return response.status(401).json({ error: 'token expired' });
      }

      user.token_created_at = null;
      user.token = null;
      user.password = password;
      await user.save();
      return user;
    }
    catch (err) {
      return response.status(err.status).send({ error: 'Sommeting went wrong at reset password' })
    }
  }


}

module.exports = ForgotPasswordController
