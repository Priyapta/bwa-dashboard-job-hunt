import React from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { PartyPopperIcon } from "lucide-react";
import { CategoryJob, Job } from "@prisma/client";
import { dateFormat } from "@/lib/utils";

type JobDetailType = {
  CategoryJob: CategoryJob | null;
} & Job;

interface JobDetailProps {
  detail: JobDetailType | null;
}
export default function JobDetail({ detail }: JobDetailProps) {
  const benefits: any = detail?.benefits;
  return (
    <div>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className=" col-span-2 space-y-8">
          <div className="text-3xl font-semibold">Description</div>
          <div
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: detail?.description ?? "" }}
          ></div>
          <div className="text-3xl font-semibold">Responsibility</div>
          <div
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: detail?.responsibility ?? "" }}
          ></div>
          <div className="text-3xl font-semibold">Who You Are</div>
          <div
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: detail?.whoYouAre ?? "" }}
          ></div>
          <div className="text-3xl font-semibold">Nice-To-Haves</div>
          <div
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: detail?.niceToHaves ?? "" }}
          ></div>
        </div>
        <div className="space-y-4">
          <div className="text-3xl font-semibold">About this role</div>
          <div className=" shadow p-3 text-center mt-6">
            {detail?.applicantsCount}
            <span className="text-gray-500">of {detail?.need} capacity</span>
          </div>
          <Progress
            value={
              detail?.applicantsCount && detail?.need
                ? (detail.applicantsCount / detail.need) * 100
                : 0
            }
          />
          <div className="mb-10 space-y-5">
            <div className="flex justify-between">
              <div className="text-grey-500">Apply Before</div>
              <div className="font-semibold">{dateFormat(detail?.dueDate)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-grey-500">Job Posted</div>
              <div className="font-semibold">
                {dateFormat(detail?.datePosted)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-grey-500">Job Type</div>
              <div className="font-semibold">{detail?.jobType}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-grey-500">Salary </div>
              <div className="font-semibold">
                ${detail?.salaryFrom} - ${detail?.salaryTo}
              </div>
            </div>
          </div>
          <Separator />

          <div className="my-10">
            <div className="text-3xl font-semibold mb-4">Category</div>
          </div>

          <div className="my-10">
            {" "}
            <div className="space-x-5">
              <Badge> {detail?.CategoryJob?.name}</Badge>
            </div>
          </div>
          <Separator />

          <div className="my-10">
            <div className="text-3xl font-semibold mb-4">Required Skills</div>

            <div className="space-x-5">
              {detail?.requiredSkills.map((item: string, i: number) => (
                <Badge variant="outline" key={i}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="text-3xl font-semibold">Perks & Benefits </div>
      <div className="text-gray-500">
        This job comes with several perks and benefits
        <div className="grid grid-cols-4 gap-5 mt-9">
          {benefits?.map((item: any) => (
            <div key={item}>
              <PartyPopperIcon />
              <div className="text-lg font-semibold mb-3">{item.benefits}</div>
              <div className="text-gray-500">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
