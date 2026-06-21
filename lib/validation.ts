import { z } from 'zod';

export const serviceInterests = [
  'Bigadtruck — Advertising, Marketing & Tech',
  'Buzzmore Media — Government & Lead Gen',
  'DPR Creation',
  'Architectural Services',
  'Project Management',
  'Web & App Development',
  'Digital Marketing & Social',
  'Not sure yet',
] as const;

export const budgetRanges = [
  'Under ₹1 Lakh',
  '₹1–5 Lakh',
  '₹5–15 Lakh',
  '₹15–50 Lakh',
  '₹50 Lakh+',
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(80),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d][\d\s-]{6,}$/, 'Enter a valid phone number'),
  company: z.string().max(120).optional().or(z.literal('')),
  service: z.enum(serviceInterests, {
    errorMap: () => ({ message: 'Select a service' }),
  }),
  // The select's placeholder submits '' — treat that as "no budget selected".
  budget: z.enum(budgetRanges).optional().or(z.literal('')),
  message: z.string().min(10, 'Tell us a little more (10+ characters)').max(2000),
  // Honeypot — accept any value at the schema level so a bot that fills it still
  // passes validation; the route then silently drops it (a max(0) here would 422
  // and reveal the trap instead of faking success).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
