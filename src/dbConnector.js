const fp = require("fastify-plugin");
const fastifyPostgres = require("fastify-postgres");

module.exports = fp(async (fastify, options) => {
  fastify.register(fastifyPostgres, {
    host: "localhost",
    port: "5432",
    database: "authenticate",
    user: "postgres",
    password: "password",
  });
});
