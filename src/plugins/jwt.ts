import fp from "fastify-plugin";
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { Role } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
    authorize: (
      roles: Role[],
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
      role: Role;
    };
  }
}

const authPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.code(401).send({
          statusCode: 401,
          error: "Unauthorized",
          message: "Please login to access this resource",
        });
      }
    },
  );

  fastify.decorate("authorize", (roles: Role[]) => {
    return async (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void> => {
      try {
        await request.jwtVerify();
        const userRole = request.user?.role;
        if (!roles.includes(userRole)) {
          reply.code(401).send({
            statusCode: 401,
            error: "Forbidden",
            message: "You do not have permission to access this resource",
          });
        }
      } catch (error) {
        reply.send(error);
      }
    };
  });

  done();
};

export default fp(authPlugin);
