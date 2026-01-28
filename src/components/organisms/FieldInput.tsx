import { Separator } from "@/components/ui/separator";
import React from "react";

type FieldInputProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function FieldInput({
  title,
  subtitle,
  children,
}: FieldInputProps) {
  return (
    <div className="space-y-4">
      <div className="my-4 flex items-start gap-6">
        <div className="w-[35%] space-y-1">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-gray-400 leading-snug max-w-xs">
            {subtitle}
          </div>
        </div>

        {/* WAJIB DOM ELEMENT */}
        <div className="flex-1">{children}</div>
      </div>

      <Separator />
    </div>
  );
}
