import { z } from 'zod';

// Zod schema for validation
export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  contactNumber: z.string().regex(/^\+\d{10,15}$/, 'Invalid contact number'),
});