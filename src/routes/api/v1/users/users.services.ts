import { CreateUserBody } from "./users.schemas.js";
import { db } from "../../../../config/db.js";
import { hashPassword } from "../../../../utils/hashUtils.js";

export async function createUser(data: CreateUserBody) {
  const hashedPassword = await hashPassword(data.password);

  const result = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const user = {
    id: result.id,
    name: result.name,
    email: result.email,
  };

  return user;
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}
