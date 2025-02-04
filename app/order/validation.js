import { z } from 'zod';

export const userIdSchema = z.object({
    userId: z
      .string()
      .regex(/^\d+$/, 'User ID must be a numeric string')
      .transform(Number), // Convert string to number
  });