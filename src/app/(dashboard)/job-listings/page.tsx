import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_LISTING_COLUMNS, JOB_LISTING_DATA } from "@/constants";
import { Badge } from "@/components/ui/badge";

import ButtonActionTable from "@/components/organisms/ButtonActionTable";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dateFormat } from "@/lib/utils";
import moment from "moment";

type JobListingsPageProps = {};
async function getDataJobs() {
  const session = await getServerSession(authOptions);
  const jobs = await prisma.job.findMany({
    where: {
      companyId: session?.user.id,
    },
  });
  return jobs;
}
export default async function jobListings() {
  const jobs = await getDataJobs();

  return (
    <div>
      <div className="font-semibold text-3xl">Job-Listings</div>
      <div className="mt-10"></div>
      <Table>
        <TableHeader>
          <TableRow>
            {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
              <TableHead key={item + i}>{item}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((item: any, i: number) => (
            <TableRow key={item.roles + i}>
              <TableCell>{item.roles}</TableCell>
              <TableCell>
                {moment(item.datePosted).isBefore(item.dueDate) ? (
                  <Badge>Live</Badge>
                ) : (
                  <Badge variant="destructive">Expired</Badge>
                )}
              </TableCell>
              <TableCell>{dateFormat(item.datePosted)}</TableCell>
              <TableCell>{dateFormat(item.dueDate)}</TableCell>
              <TableCell>{item.jobType}</TableCell>
              <TableCell>{item.applicantsCount}</TableCell>
              <TableCell>{item.need}</TableCell>
              <TableCell>
                <ButtonActionTable url={`/job-detail/${item.id}`} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
