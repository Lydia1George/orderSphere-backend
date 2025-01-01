import { z } from 'zod';

// Define the Zod schema
export const productSearchSchema = z.object({
  filters: z
      .object({
          categoryId: z.string().regex(/^\d+$/, "categoryId must be a string of digits").optional(),
          name: z.string().min(1, "Name cannot be empty").optional(),
      })
      .optional(),
  pageNumber: z.number().int().positive("Page number must be a positive integer").optional(),
});