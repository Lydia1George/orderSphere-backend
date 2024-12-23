import { z } from 'zod';

// Define the Zod schema
export const productSearchSchema = z.object({
  filters: z.object({
    categoryId: z.string().regex(/^\d+$/, "categoryId must be a string of digits"), // Validate as a string of digits
    name: z.string().min(1, "Name cannot be empty"), // Ensure name is a non-empty string
  }),
  pageNumber: z
    .number()
    .int()
    .positive("Page number must be a positive integer") // Ensure pageNumber is a positive integer
    .optional(), // Optional, if not required
});
