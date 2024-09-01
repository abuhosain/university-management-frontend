import { z } from "zod";

export const academicSemesteSchema = z.object({
    name: z.string({ required_error: "Please select Name" }),
    year: z.string({ required_error: "Please select Year" }),
    startMonth: z.string({ required_error: "Please select Start Month" }),
    endMonth: z.string({ required_error: "Please select End month" }),
  });