"use client";
import React from "react";
import { Button } from "../ui/button";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

type ButtonActionProps = {
  url: string;
};
export default function ButtonActionTable({ url }: ButtonActionProps) {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(url)} size="icon" variant="outline">
      <MoreVertical className="w-4 h-4" />
    </Button>
  );
}
