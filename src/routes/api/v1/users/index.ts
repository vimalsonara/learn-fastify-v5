import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  createUserBodySchema,
  getUserByIdParamsSchema,
} from "./users.schemas.js";
import { createUserHandler, getUserByIdHandler } from "./users.controllers.js";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      schema: {
        body: createUserBodySchema,
        tags: ["user"],
      },
    },
    createUserHandler,
  );
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/:id",
      { schema: { params: getUserByIdParamsSchema, tags: ["user"] } },
      getUserByIdHandler,
    );
};

export default users;
