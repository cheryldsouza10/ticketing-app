const postBodySchema = {
  type: "object",
  required: ["ticketNumber","name"],
  properties: {
    ticketNumber: {
      type: "number"
    },
    name: {
      type: "string"
    },
    age: {
      type: "number"
    },
    gender: {
      type: "string",
      enum: ["M", "F"]
    }
  }
}

const adminPostQuerySchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      minLength: 1
    }
  }
}

const adminQueryParamSchema = {
  type: "object",
  properties: {
    bus: {
      type: "number",
      default: 1
    }
  }
}

const ticketNoQueryParam = {
  type: "object",
  required: ["ticketNo"],
  properties: {
    ticketNo: {
      type: "string",
      minLength: 1
    }
  }
}

const statusQueryParam = {
  type: "object",
  required: ["status"],
  properties: {
    status: {
      type: "string",
      minLength: 1,
      enum: ["close", "open"]
    }
  }
}

module.exports = {
  postSchema: {
    body: postBodySchema
  },
  getTicketDetailsSchema: {
    params: ticketNoQueryParam
  },
  getListByStatusSchema: {
    querystring: statusQueryParam
  },
  adminPostSchema: {
    params: adminPostQuerySchema,
    querystring: adminQueryParamSchema
  }
}