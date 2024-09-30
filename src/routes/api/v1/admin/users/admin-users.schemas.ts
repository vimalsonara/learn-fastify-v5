import { z } from "zod";

const userWithoutPasswordSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["USER", "ADMIN", "BOX_OWNER"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const adminUsersSchema = {
  list: z.object({
    users: z.array(userWithoutPasswordSchema),
  }),
};
