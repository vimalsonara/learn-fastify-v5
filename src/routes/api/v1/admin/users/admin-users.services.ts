import { db } from "../../../../../config/db.js";

async function listUsers() {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export const adminUsersServices = {
  list: listUsers,
};
