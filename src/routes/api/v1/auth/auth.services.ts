import { db } from "../../../../config/db.js";
import { verifyPassword } from "../../../../utils/hashUtils.js";
import { LoginBody } from "./auth.schemas.js";

export async function login({ email, password }: LoginBody) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
