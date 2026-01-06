import React, { useState, FC } from "react";
import DialogAddBenefit from "./DialogAddBenefit";
import { PartyPopper, X } from "lucide-react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { jobFormSchema } from "@/lib/form-schema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

type InputBenefitProps = {
  form: any;
};

export function InputBenefit({ form }: InputBenefitProps) {
  const [benefit, setBenefits] = useState<any[]>([]);

  const deleteBenefit = (item: any) => {
    const deleteBenefits = benefit.filter((benefits: any) => item !== benefit);
    setBenefits([...deleteBenefits]);
    form.setValue("benefits", deleteBenefits);
  };

  const updateBenefits = (item: any) => {
    const newValue: any[] = [...benefit, item];

    setBenefits(newValue);
    form.setValue("benefits", newValue);
  };

  return (
    <div className="block ">
      <DialogAddBenefit updateBenefits={updateBenefits} />
      <div className="flex flex-row flex-wrap gap-5 mt-5">
        {benefit.map((item: any, i: number) => (
          <div
            key={i}
            className="border border-gray-200 rounded-sm p-3 relative w-full max-w-[260px]"
          >
            <PartyPopper className="w-7 h-7 mb-5  mx-4 text-primary" />
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => deleteBenefit(item)}
            >
              <X className="w-6 h-6" />
            </div>

            <div className="text-xl font-semibold mb-3">{item.benefit}</div>
            <div className="text-gray-500 text-sm">{item.description}</div>
          </div>
        ))}
      </div>

      <FormField
        control={form.control}
        name="benefits"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
}
