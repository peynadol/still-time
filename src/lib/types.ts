// zod and ts types can go here

import { z } from "zod";

export const moodOptions = [
  "Calm",
  "Focused",
  "Present",
  "Grounded",
  "Peaceful",
  "Energized",
  "Motivated",
  "Curious",
  "Playful",
  "Flowing",
  "Introspective",
  "Contemplative",
  "Thoughtful",
  "Nostalgic",
  "Absorbed",
  "Frustrated",
  "Tired",
  "Scattered",
  "Anxious",
  "Blocked",
  "Neutral",
  "Meh",
  "Numb",
  "Bored",
  "Blank",
] as const;

export const sessionFormSchema = z.object({
  type: z.string().min(1),
  duration: z.number().min(1),
  tools: z.array(z.string()),
  notes: z.string().optional(),
  mood: z.array(z.enum(moodOptions)),
});

export const sessionSchema = sessionFormSchema.extend({
  id: z.string(),
  timestamp: z.string,
});

export type SessionForm = z.infer<typeof sessionFormSchema>;
export type Session = z.infer<typeof sessionSchema>;
