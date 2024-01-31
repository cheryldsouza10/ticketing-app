const fp = require("fastify-plugin");
const { TICKET_STATUS, BUS_CAPACITY } = require("../utilities/constants");

module.exports = fp((fastify, options, next) => {
  const bookTicketService = async (data) => {
    const {ticketNumber} = data;
    if (ticketNumber > 40) {
      throw {
        status: 400,
        message: `Bus has a ${BUS_CAPACITY} seat capacity. Please enter a ticket number between 1 to ${BUS_CAPACITY}.`
      }
    }

    const ticketDetails = await fastify.ticketRepository.getTicketStatusRepository(ticketNumber);
    if(ticketDetails && ticketDetails.status === TICKET_STATUS.CLOSE) {
      throw {
        status: 400,
        message: "Status of the ticket is CLOSED/IN_PROGRESS. Please try booking with another ticket number"
      }
    } else {
      return await fastify.ticketRepository.bookTicketRepository({...data, status: TICKET_STATUS.CLOSE});
    }
  }

  const getTicketStatusService = async (ticketNumber) => {
    const ticketDetails = await fastify.ticketRepository.getTicketStatusRepository(ticketNumber);
    if (!ticketDetails) {
      return {message: `No details present for ticket no. ${ticketNumber}`}
    }
    return ticketDetails;
  }

  const getTicketListService = async (status) => {
    const busCapacity = new Array(BUS_CAPACITY).fill(0).map((e,i)=>i+1);
    const data = await fastify.ticketRepository.getTicketListByStatus();
    const ticketList = data.map((val)=>val.ticket_no)

    if (status === TICKET_STATUS.CLOSE) {
      return {
        ticketStatus: TICKET_STATUS.CLOSE,
        tickets: ticketList
      }
    } else {
      return {
        ticketStatus: TICKET_STATUS.OPEN,
        tickets: busCapacity.filter((x) => ticketList.indexOf(x) === -1)
      }
    }

  }

  const getTicketDetailsService = async (ticketNumber) => {
    const details = await fastify.ticketRepository.getTicketDetailsRepository(ticketNumber);
    if(!details) {
      return {
        message: `No details present for ticket no. ${ticketNumber}`
      }
    }
    return details;
  }

  fastify.decorate("ticketService", {
    bookTicketService,
    getTicketStatusService,
    getTicketListService,
    getTicketDetailsService,
  });
  next();
},
  {
    name: "ticket-service"
  }
);
