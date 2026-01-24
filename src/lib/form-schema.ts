import { JOBTYPES } from "@/constants";
import { z } from "zod";

export type optionType = {
  id: string;
  label: string;
};
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
    .min(10, { message: "Responsibility must be at least 10 characters" }),
  whoYouAre: z
    .string()
    .min(10, { message: "Who You Are must be at least 10 characters" }),
  niceToHaves: z
    .string()
    .min(10, { message: "Nice-To-Have must be at least 10 characters" }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: "Benefits must be at least 1 benefit" }),
});

export const overviewformSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required",
  }),
  image: z.any().refine((file) => file?.name, {
    message: "Image is required",
  }),
  website: z.string().min(5, { message: "Website Required" }),
  location: z.string().min(5, { message: "Location Required" }),
  employee: z.string().min(5, { message: "Employee Required" }),
  industry: z.string().min(5, { message: "Industry Required" }),
  dateFounded: z.date().min(5, { message: "Date Founded Required" }),
  techStack: z.array(z.string()).min(1, {
    message: "Tech stack must have at least 1 item",
  }),
  description: z.string().min(5, { message: "Description Required" }),
});

export const LOCATION_OPTIONS: optionType[] = [
  { id: "Indonesia", label: "Indonesia" },
  { id: "Malaysia", label: "Malaysia" },
  { id: "Singapura", label: "Singapura" },
  { id: "Thailand", label: "Thailand" },
];

export const EMPLOYEE_OPTIONS: optionType[] = [
  {
    id: "1-50",
    label: "1-50",
  },
  {
    id: "51-150",
    label: "51-150",
  },
  {
    id: "151-250",
    label: "151-250",
  },
  {
    id: "251-500",
    label: "251-500",
  },
  {
    id: "500-1000",
    label: "500-1000",
  },
  {
    id: "1000-above",
    label: "1000-above",
  },
];

export const SocialMediaFormSchema = z.object({
  facebook: z.string().min(5, { message: "Facebook link is required" }),
  instagram: z.string().min(5, { message: "Instagram link is required" }),
  twitter: z.string().min(5, { message: "Twitter link is required" }),
  youtube: z.string().min(5, { message: "Youtube link is required" }),
});

export const TeamFormSchema = z.object({
  name: z.string().min(5, { message: "Name is Required" }),
  position: z.string().min(5, { message: "Position is Required" }),
  linkedin: z.string().min(5, { message: "Linkedin is Required" }),
  instagram: z.string().min(5, { message: "Instagram is Required" }),
});
