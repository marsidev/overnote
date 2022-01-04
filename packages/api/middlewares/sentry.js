const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const express = require('express')
const app = express()

const sentryInit = (request, response, next) => {
  Sentry.init({
    dsn: 'https://e2eb6f211e7f4caeb7a9d60258bc515b@o1099137.ingest.sentry.io/6123633',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app })
    ],
    tracesSampleRate: 1.0
  })
  next()
}

module.exports = {
  sentryInit,
  sentryRequestHandler: Sentry.Handlers.requestHandler(),
  sentryTracingHandler: Sentry.Handlers.tracingHandler(),
  sentryErrorHandler: Sentry.Handlers.errorHandler()
}
