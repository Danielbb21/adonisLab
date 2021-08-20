'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Youch = use('youch')
const Env = use('Env')
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
const Config = use('Config');

const Raven = require("raven");

class ExceptionHandler extends BaseExceptionHandler {

  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status)
  }

  async report (error, { request }) {
    Sentry.init({
      dsn: Config.get('services.sentry.dsn'),

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
    Sentry.captureException(error);
  }
}

module.exports = ExceptionHandler
