import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password must be at least 6 characters"),
});

export type LoginBody = z.infer<typeof loginSchema>;
