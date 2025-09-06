import * as z from "zod";

// helper for <input type="datetime-local"> validation
const isDateTimeLocal = (s: string) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s);

export const EventSchema = z.object({
  title: z
    .string({ error: "Title is required." })
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title must be 100 characters or fewer."),
  description: z
    .string()
    .max(500, "Description can’t exceed 500 characters.")
    .optional(),
  // convert string -> Date and customize messages
  date: z.date({
    error: "Please pick the event date.",
  }).optional(),
  singleDayEvent: z.boolean().optional(),
  startTime: z
    .string({ error: "Start time is required." })
    .refine(isDateTimeLocal, "Use the format YYYY-MM-DDTHH:MM."),
  endTime: z
    .string()
    .refine((v) => !v || isDateTimeLocal(v), "End time must be YYYY-MM-DDTHH:MM.")
    .optional(),
  mapUrl: z.string().url("Enter a valid URL (https://...)").optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Only lowercase letters, numbers, and hyphens.")
    .optional(),
  location: z
    .string({ error: "Location is required." })
    .max(100, "Location must be 100 characters or fewer."),
})
.superRefine((data, ctx) => {
  // cross-field message: endTime must be after startTime
  if (data.endTime && data.startTime) {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"], // attach error to this field
        message: "End time must be after start time.",
      });
    }
  }
});
