import { EnumValues } from "zod/v3";

export const JOBTYPES = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
] as const;

export const JOB_LISTING_COLUMNS: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job Type",
  "Applicants",
  "Needs",
];

export const JOB_LISTING_DATA = [
  {
    roles: "Software Engineer",
    status: "Live",
    datePosted: "12 Aug 2023",
    dueDated: "12 Sep 2023",
    jobType: "Full-Time",
    applicants: 1,
    needs: 10,
  },
];

export const JOB_APPLICANT_COLUMNS: string[] = ["Name", "Applied Date"];

export const JOB_APPLICANT_DATA = [
  {
    name: "Ariyanto",
    appliedDate: "10 Agustus 2023",
  },
];
