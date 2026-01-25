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
export default function jobListings() {
  return (
    <div>
      <div className="font-semibold text-3xl">Job-Listings</div>
      <div className="mt-10"></div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
              <TableHead key={item + i}>{item}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {JOB_LISTING_DATA.map((item: any, i: number) => (
            <TableRow key={item.roles + i}>
              <TableCell>{item.roles}</TableCell>
              <TableCell>
                <Badge>{item.status}</Badge>
              </TableCell>
              <TableCell>{item.datePosted}</TableCell>
              <TableCell>{item.dueDated}</TableCell>
              <TableCell>{item.jobType}</TableCell>
              <TableCell>
                {item.applicants} / {item.needs}
              </TableCell>
              <TableCell>{item.needs}</TableCell>
              <TableCell>
                <ButtonActionTable url="/job-detail/1" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
