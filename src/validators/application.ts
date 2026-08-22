import { z } from 'zod';

export const ApplicationSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  salary: z.string().optional(),
  jobUrl: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
