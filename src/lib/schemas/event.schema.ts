import * as z from "zod";

const isHHMM = (s: string) => /^(0[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i.test(s);

export const EventSchema = z
  .object({
    title: z
      .string({ error: "Title is required." })
      .min(2, "Title must be at least 2 characters.")
      .max(100, "Title must be 100 characters or fewer."),

    startDate: z.date({ error: "Event start date is required." }),

    startTime: z
      .string({ error: "Start time is required." })
      .refine(isHHMM, "Please select a valid start time."),

   location: z
  .string({ error: "Location is required." })
  .min(1, "Location is required.") 
  .max(100, "Location must be 100 characters or fewer."),


    endDate: z.date().optional(),

    endTime: z
      .string()
      .refine(
        (v) => !v || isHHMM(v),
        "Please select a valid end time."
      )
      .optional(),

    description: z
      .string()
      .max(500, "Description can’t exceed 500 characters.")
      .optional(),

    mapUrl: z
  .string()
  .transform((val) => val === "" ? undefined : val)
  .optional()
  .refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Enter a valid URL (https://...)"
  }),

    singleDayEvent: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be before start date.",
      });
    }

    if (data.endTime && data.startTime) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endTime"],
          message: "End time must be after start time.",
        });
      }
    }
  });
