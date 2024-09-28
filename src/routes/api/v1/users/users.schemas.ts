import { z } from "zod";

export const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const getUserByIdParamsSchema = z.object({
  id: z.string(),
});
