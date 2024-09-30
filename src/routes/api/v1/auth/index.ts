import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { LoginBody, loginSchema } from "./auth.schemas.js";
import { loginHandler } from "./auth.controllers.js";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().post<{
    Body: LoginBody;
  }>("/login", { schema: { body: loginSchema, tags: ["auth"] } }, async (request, reply) => {
    return loginHandler(fastify, request, reply);
  });
};

export default auth;
