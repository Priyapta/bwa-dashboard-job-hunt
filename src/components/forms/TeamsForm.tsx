"use client";

import FieldInput from "../organisms/FieldInput";
import { InstagramIcon, LinkedinIcon } from "lucide-react";
import DialogAddTeam from "../teamForm/DialogAddTeam";
import { useForm } from "react-hook-form";
import { TeamFormSchema } from "@/lib/form-schema";
import z from "zod";

function TeamsForm() {
  const form = useForm<z.infer<typeof TeamFormSchema>>;

  const onSubmit = (val: z.infer<typeof TeamFormSchema>) => {
    console.log(val);
  };
  return (
    <FieldInput
      title="Basic Information"
      subtitle="Add team members of your company"
    >
      <div className="w=[65%] mb-5">
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-semibold"> 2 Members </div>

          <DialogAddTeam />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          {[0, 1, 2].map((item: number) => (
            <div key={item} className="p-3 shadow text-center">
              <div className="w-14 h-14 rounded-full bg-gray-200 mx-auto" />
              <div className="mt-4 font-semibold">Hariyanto</div>
              <div className="text-sm text-gray-500">CEO</div>
              <div className="mt-5 inline-flex mx-auto gap-3 text-gray-500">
                <InstagramIcon className="w-4 h-5" />
                <LinkedinIcon className="w-4 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </FieldInput>
  );
}

export default TeamsForm;
