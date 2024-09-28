import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserBody } from "./users.schemas.js";
import { createUser, getUserById } from "./users.services.js";

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserBody }>,
  replay: FastifyReply,
) {
  const { ...data } = request.body;

  try {
    const user = await createUser(data);
    return replay.code(201).send({ user, message: "User created" });
  } catch (e) {
    return replay.code(500).send({ message: "Internal server error" });
  }
}

export async function getUserByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  replay: FastifyReply,
) {
  const { id } = request.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return replay.code(404).send({ message: "User not found" });
    }
    return replay.send({ user });
  } catch (e) {
    return replay.code(500).send({ message: "Internal server error" });
  }
}
