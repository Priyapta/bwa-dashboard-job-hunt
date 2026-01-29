import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import prisma from "../../../../../lib/prisma";

type paramsType = {
  id: string;
};
type JobDetailProps = {
  params: paramsType;
};

async function getDetailJob(id: string) {
  const job = await prisma.job.findFirst({
    where: {
      id: id,
    },
    include: {
      applicants: true,
      CategoryJob: true,
    },
  });

  return job;
}
export default async function JobDetailPage({ params }: JobDetailProps) {
  const job = await getDetailJob(params.id);
  console.log(job);
  // console.log(params.id);
  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <Link href="/job-listings">
          <ArrowLeftIcon className="w-9-h-9" />
        </Link>
      </div>
      <div>
        <div className="text-2xl font-semibold mb-1"> {job?.roles}</div>
      </div>
      <div>
        {" "}
        {job?.roles}. {job?.jobType}. {job?.applicantsCount}/{job?.need} Hired
      </div>
      <div>
        <Tabs defaultValue="applicants">
          <TabsList>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
          </TabsList>
          <TabsContent value="applicants">
            <Applicants applicants={job?.applicants} />
          </TabsContent>
          <TabsContent value="jobDetails">
            <JobDetail detail={job ?? null} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
