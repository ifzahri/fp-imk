import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  telp_number: z.string().optional(),
});

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
  is_verified: z.boolean(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
  role: z.enum(['admin', 'user']),
});

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: z.boolean(),
    message: z.string(),
    data: dataSchema,
    meta: z.object({
      page: z.number(),
      per_page: z.number(),
      max_page: z.number(),
      count: z.number(),
    }).optional(),
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;