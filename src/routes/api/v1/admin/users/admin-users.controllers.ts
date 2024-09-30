import { FastifyReply, FastifyRequest } from "fastify";

import { adminUsersServices } from "./admin-users.services.js";

async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await adminUsersServices.list();
    return reply.send({ users });
  } catch (e) {
    return reply.code(500).send({ message: "Internal server error" });
  }
}

export const adminUsersControllers = {
  list: listUsers,
};
