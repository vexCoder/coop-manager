import { z } from "zod";

export const loginSchema = z
  .object({
    password: z.string().min(3),
  })
  .required();

export const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
