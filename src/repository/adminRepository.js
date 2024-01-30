const fp = require("fastify-plugin");
const SQL = require("@nearform/sql");
const { TICKET_STATUS } = require("../utilities/constants")

module.exports = fp((fastify, options, next) => {
  const checkIfAdminPresent = async (adminId, busNo) => {
    const sql = SQL`SELECT * FROM admin_details
        WHERE id=${adminId} AND bus_no=${busNo}`

    try {
      const result = await fastify.pg.query(sql);
      return result.rows && result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  const resetTicketsByBus = async (busNo) => {
    const sql = SQL`DELETE from ticket_details WHERE bus_no=${busNo}`

    try {
      return await fastify.pg.query(sql);
    } catch (err) {
      throw err;
    }
  }

  fastify.decorate("adminRepository", {
    checkIfAdminPresent,
    resetTicketsByBus
  });
  next();
},
  {
    name: "admin-repository"
  }
);
