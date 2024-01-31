const fp = require("fastify-plugin");
const { BUS_NO_DEFAULT } = require("../utilities/constants");

module.exports = fp((fastify, options, next) => {
  const resetTicketsService = async (busNo, adminId) => {
    if (busNo === BUS_NO_DEFAULT) {
      const isAdminValid = await fastify.adminRepository.checkIfAdminPresent(adminId,busNo);
      if (isAdminValid) {
        await fastify.adminRepository.resetTicketsByBus(busNo);
        return {
          message: `Tickets for bus no. ${busNo} are successfully reset.`
        }
      } else {
        return {
          message: `Admin ID ${adminId} is not registered for bus no. ${busNo}. Please contact service team.`,
          details: "For bus 1 registerered admins have IDs admin-1, admin-2"
        }
      }
    } else {
      return {
        message: `Details for only bus no. ${BUS_NO_DEFAULT} are present.`
      }
    }
  }

  fastify.decorate("adminService", {
    resetTicketsService,
  });
  next();
},
  {
    name: "admin-service"
  }
);
