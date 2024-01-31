const fp = require("fastify-plugin");
const SQL = require("@nearform/sql");
const { TICKET_STATUS } = require("../utilities/constants")

module.exports = fp((fastify, options, next) => {
  const bookTicketRepository = async (data) => {
    const sql = SQL`INSERT INTO ticket_details (
        bus_no,
        ticket_no,
        status,
        user_name,
        user_age,
        user_gender
    ) VALUES (
        1,
        ${data.ticketNumber},
        ${data.status},
        ${data.name},
        ${data.age || null},
        ${data.gender || null}
    );`

    try {
      const result = await fastify.pg.query(sql);
      return result.rows && result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  const getTicketStatusRepository = async (ticketNumber) => {
    const sql = SQL`SELECT ticket_no, status FROM ticket_details
        WHERE ticket_no=${ticketNumber}`

    try {
      const result = await fastify.pg.query(sql);
      return result.rows && result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  const getTicketListByStatus = async () => {
    const sql = SQL`SELECT ticket_no FROM ticket_details WHERE status='close'`
    try {
      const result = await fastify.pg.query(sql);
      return result.rows && result.rows;
    } catch (err) {
      throw err;
    }
  }

  const getTicketDetailsRepository = async (ticketNumber) => {
    const sql = SQL`SELECT * FROM ticket_details WHERE ticket_no=${ticketNumber}`
    try {
      const result = await fastify.pg.query(sql);
      return result.rows && result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  const resetTicketsRepository = async () => {
    const sql = SQL`UPDATE ticket_details set status=${TICKET_STATUS.OPEN}`
    try {
      const result = await fastify.pg.query(sql);
      return result.rows && result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  fastify.decorate("ticketRepository", {
    bookTicketRepository,
    getTicketStatusRepository,
    getTicketListByStatus,
    getTicketDetailsRepository,
    resetTicketsRepository,
  });
  next();
},
  {
    name: "ticket-repository"
  }
);
