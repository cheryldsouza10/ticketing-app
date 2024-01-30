const {
  adminPostSchema,
} = require("./schema/apiSchema");

const adminApi = async (fastify) => {
  fastify.post(
    "/:id/reset",
    {schema: adminPostSchema},
    async (req, reply) => {
      const params = req.query.bus;
      const adminId = req.params.id;
      const response = await fastify.adminService.resetTicketsService(params,adminId);

      reply.code(200).send(response);
    }
  );
};

module.exports = adminApi;
module.exports.autoPrefix = '/admin';
