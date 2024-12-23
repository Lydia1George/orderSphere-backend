import { z } from 'zod';

export const productIdSchema = z.object({
    productId: z
      .string()
      .regex(/^\d+$/, 'Product ID must be a numeric string')
      .transform(Number), // Convert string to number
  });