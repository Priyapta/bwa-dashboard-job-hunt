import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
export default function JobDetailPage() {
  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <Link href="/job-listings">
          <ArrowLeftIcon className="w-9-h-9" />
        </Link>
      </div>
      <div>
        <div className="text-2xl font-semibold mb-1"> Brand Designer</div>
      </div>
      <div> Design. Full-Time. 1/10 Hired</div>
      <div>
        <Tabs defaultValue="applicants">
          <TabsList>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
          </TabsList>
          <TabsContent value="applicants">
            <Applicants />
          </TabsContent>
          <TabsContent value="jobDetails">
            <JobDetail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
