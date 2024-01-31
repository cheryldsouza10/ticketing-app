const fp = require("fastify-plugin");
const fastifyPostgres = require("fastify-postgres");
require("dotenv").config();

module.exports = fp(async (fastify, options) => {
  fastify.register(fastifyPostgres, {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });
});
