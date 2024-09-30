import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { LoginBody } from "./auth.schemas.js";
import { login } from "./auth.services.js";

export async function loginHandler(
  fastify: FastifyInstance,
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;
  try {
    const user = await login({ email, password });

    if (!user) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const token = fastify.jwt.sign({ id: user.id, role: user.role });

    return reply.send({ user, token });
  } catch (e) {
    return reply.code(401).send({ message: "Invalid email or password" });
  }
}
