const {
  postSchema,
  getTicketDetailsSchema,
  getListByStatusSchema
} = require("./schema/apiSchema");

const ticketApi = async (fastify) => {
  fastify.post(
    "/",
    {schema: postSchema},
    async (req, reply) => {
      response = await fastify.ticketService.bookTicketService(req.body);
      reply.code(200).send(response);
    }
  );

  fastify.get(
    "/:ticketNo/status",
    {schema: getTicketDetailsSchema},
    async (req, reply) => {
      const ticketNo = req.params.ticketNo;
      const response = await fastify.ticketService.getTicketStatusService(ticketNo);

      reply.code(200).send(response);
    }
  );

  fastify.get(
    "/list",
    {schema: getListByStatusSchema},
    async (req, reply) => {
      const status = req.query.status;
      const response = await fastify.ticketService.getTicketListService(status);

      reply.code(200).send(response);
    }
  );

  fastify.get(
    "/:ticketNo/details",
    {schema: getTicketDetailsSchema},
    async (req, reply) => {
      const ticketNo = req.params.ticketNo;
      const response = await fastify.ticketService.getTicketDetailsService(ticketNo);

      reply.code(200).send(response);
    }
  );
};

module.exports = ticketApi;
module.exports.autoPrefix = '/ticket';
