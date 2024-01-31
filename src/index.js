const fastify = require('fastify')
const autoload = require('@fastify/autoload')
const path = require("path");
require("dotenv").config();

const app = fastify()
const db = require('./dbConnector.js');
app.register(db)

const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
const port = process.env.PORT || 3000;

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

app.listen({host: host, port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
