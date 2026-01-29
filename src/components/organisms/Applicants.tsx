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
import {
  JOB_APPLICANT_COLUMNS,
  JOB_APPLICANT_DATA,
  JOB_LISTING_COLUMNS,
  JOB_LISTING_DATA,
} from "@/constants";

import ButtonActionTable from "./ButtonActionTable";
import { Badge } from "../ui/badge";
import { Applicant } from "@prisma/client";

type ApplicantsProps = {
  applicants: Applicant[] | undefined;
};
export default function Applicants({ applicants }: ApplicantsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {JOB_APPLICANT_COLUMNS.map((item: string, i: number) => (
            <TableHead key={item + i}>{item}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants?.map((item: any, i: number) => (
          <TableRow key={item.roles + i}>
            <TableCell>{item.user.name}</TableCell>
            <TableCell>
              <Badge>{item.appliedDate}</Badge>
            </TableCell>

            <TableCell>
              <ButtonActionTable url="/settings" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
