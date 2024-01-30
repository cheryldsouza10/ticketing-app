const fastify = require('fastify')
const autoload = require('@fastify/autoload')
const path = require("path");

const app = fastify()
const db = require('./dbConnector.js');
app.register(db)

app.register(autoload, {
  dir: path.join(__dirname, "repository"),
  ignorePattern: /^(__tests__)/,
});

app.register(autoload, {
  dir: path.join(__dirname, "service"),
  ignorePattern: /^(__tests__)/,
});

app.register(autoload, {
  dir: path.join(__dirname, 'api'),
  ignorePattern: /^(schema)/,
})

app.listen({ port: 3000 })
