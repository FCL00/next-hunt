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

export type ApplicationStage = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';

export type Application = {
  id: string;
  userId: string;
  company: string;
  role: string;
  location: string | null;
  salary: string | null;
  jobUrl: string | null;
  description: string | null;
  notes: string | null;
  state: ApplicationStage;
  stageChangedAt: Date;
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
