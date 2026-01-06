import { JOBTYPES } from "@/constants";
import { z } from "zod";

export const jobFormSchema = z.object({
  roles: z.string().min(3, {
    message: "Job Title must be at least 3 characters",
  }),
  jobType: z.enum(JOBTYPES, {
    message: "Invalid Job Type",
  }),
  salaryFrom: z.string().min(1, { message: "Salary From is required" }),
  salaryTo: z.string().min(1, { message: "Salary To is required" }),
  categoryId: z.string().min(1, { message: "you need select the catogires" }),
  requiredSkills: z
    .string()
    .array()
    .nonempty({ message: "Required Skill must be at least 1 skill" }),
  jobDescription: z
    .string()
    .min(10, { message: "Job Description must be at least 10 characters" }),
  responsibility: z
    .string()
    .min(10, { message: "Job Description must be at least 10 characters" }),
  whoYouAre: z
    .string()
    .min(10, { message: "Job Description must be at least 10 characters" }),
  niceToHaves: z
    .string()
    .min(10, { message: "Job Description must be at least 10 characters" }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: "Benefits must be at least 1 benefit" }),
});
