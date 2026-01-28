"use client";
import { jobFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FieldInput from "@/components/organisms/FieldInput";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { JOBTYPES } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputSkills from "@/components/InputSkills";
import { JobDescriptionEditor } from "@/components/organisms/jobDescription";

import { useFieldArray } from "react-hook-form";
import DialogAddBenefit from "@/components/DialogAddBenefit";
import { InputBenefit } from "@/components/InputDialogAddBenefit";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { CategoryJob, Job } from "@prisma/client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function page() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR<CategoryJob[]>(
    "api/job/categories",
    fetcher,
  );

  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      roles: "",
      jobType: undefined,
      salaryFrom: "",
      salaryTo: "",
      categoryId: "",
      requiredSkills: [],
      jobDescription: "",
      responsibility: "",
      whoYouAre: "",
      niceToHaves: "",
      benefits: [],
    },
  });
  const { append } = useFieldArray({
    control: form.control,
    name: "benefits",
  });
  const router = useRouter();
  const onSubmit = async (val: z.infer<typeof jobFormSchema>) => {
    try {
      if (!session?.user?.id) {
        toast.error("You must be logged in");
        return;
      }

      const body = {
        applicantsCount: 0,
        benefits: val.benefits,
        categoryId: val.categoryId || null,
        companyId: session.user.id,
        datePosted: new Date(),
        dueDate: moment().add(1, "month").toDate(),
        jobType: val.jobType,
        need: 20,
        niceToHaves: val.niceToHaves,
        requiredSkills: val.requiredSkills,
        description: val.jobDescription,
        responsibility: val.responsibility,
        roles: val.roles,
        salaryFrom: val.salaryFrom,
        salaryTo: val.salaryTo,
        whoYouAre: val.whoYouAre,
      };

      const res = await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      toast.success("Job posted successfully");
      router.push("/job-listings");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to post job";
      toast.error(message);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="inline-flex items-center gap-2 cursor-pointer hover:text-primary ">
        <ArrowLeftIcon className="W-7 h-7" />
        <span className="text-2xl font-semibold">Post a Job</span>
      </div>
      <div className="my-5">
        <div className="text-lg font-semibold">Basic Information </div>
        <div className="text-gray-400">
          List out your top perks and benefits
        </div>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldInput
            title="Job Title"
            subtitle="Job Title must be describe one position"
          >
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Software Engineer" {...field} />
                  </FormControl>
                  <FormDescription>At least 80 character</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Type of Employment"
            subtitle="You can select multiple type of employment"
          >
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-2"
                    >
                      {JOBTYPES.map((item: string, i: number) => (
                        <div key={item + 1} className="flex items-center gap-3">
                          <RadioGroupItem value={item} id={item} />
                          <Label htmlFor={item}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Salary"
            subtitle="Please specify the estimated salary range for the role"
          >
            <div className="w-112.5 flex flex-row justify-between items-center">
              <FormField
                control={form.control}
                name="salaryFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" placeholder="$100" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-center">to</span>
              <FormField
                control={form.control}
                name="salaryTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="$1000"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldInput>
          <FieldInput
            title="Categories"
            subtitle="You can select multiple job categories"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-45 border border-gray-800 focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
                        <SelectValue placeholder="Select Job Categories" />
                      </SelectTrigger>

                      <SelectContent>
                        {data?.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Required Skills"
            subtitle="Add required skills for the job"
          >
            <InputSkills form={form} name="requiredSkills" label="Add Skills" />
          </FieldInput>
          <FieldInput
            title="Job Descriptions"
            subtitle="Job titles must be describe one position"
          >
            <JobDescriptionEditor form={form} name="jobDescription" />
          </FieldInput>
          <FieldInput
            title="Responsibilities"
            subtitle="Outline the core responsibilities of the position"
          >
            <JobDescriptionEditor form={form} name="responsibility" />
          </FieldInput>
          <FieldInput
            title="Who You Are"
            subtitle="Add your preferred candidates qualifications"
          >
            <JobDescriptionEditor form={form} name="whoYouAre" />
          </FieldInput>

          <FieldInput
            title="Nice-To-Haves"
            subtitle="Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to apply"
          >
            <JobDescriptionEditor form={form} name="niceToHaves" />
          </FieldInput>
          <FieldInput
            title="Perks and Benefits"
            subtitle="This your benefits in send"
          >
            <InputBenefit form={form} />
          </FieldInput>

          <div className="flex justify-end my-2">
            <Button type="submit" size={"lg"}>
              Do a Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
