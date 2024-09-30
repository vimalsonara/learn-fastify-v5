import { FastifyPluginAsync } from "fastify";

import { adminUsersControllers } from "./admin-users.controllers.js";
import { adminUsersSchema } from "./admin-users.schemas.js";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: adminUsersSchema.list,
        },
        tags: ["admin"],
      },
      onRequest: [fastify.authenticate, fastify.authorize(["ADMIN"])],
    },
    adminUsersControllers.list,
  );
};

export default users;
