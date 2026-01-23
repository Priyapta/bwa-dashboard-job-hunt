"use client";
import {
  EMPLOYEE_OPTIONS,
  LOCATION_OPTIONS,
  overviewformSchema,
} from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import TitleForm from "../atoms/TitleForm";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FieldInput from "../organisms/FieldInput";
import CustomUpload from "../organisms/form/CustomUpload";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CalendarIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import InputSkills from "../InputSkills";
import CKEditor from "../organisms/CkeEditor";

export default function OverViewForms() {
  const [date, setDate] = React.useState<Date>();
  const form = useForm<z.infer<typeof overviewformSchema>>({
    resolver: zodResolver(overviewformSchema),
    defaultValues: {
      name: "",
      website: "",
      location: "",
      employee: "",
      industry: "",
      techStack: [],
      description: "",
      dateFounded: undefined,
      image: undefined,
    },
  });

  const onSubmit = (val: z.infer<typeof overviewformSchema>) => {
    console.log(val);
  };

  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  useEffect(() => {
    setEditorLoaded(true);
  });
  return (
    <div>
      <TitleForm
        title="Basic Information"
        subtitle="This is compnay information that you can update anytime"
      />
      <Separator className="mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FieldInput
            title="Company Logo"
            subtitle="This image will be shown publicly as company logo."
          >
            <CustomUpload form={form} name="image" />
          </FieldInput>

          <FieldInput
            title="Company Details"
            subtitle="Introduce your company core info quickly to users by fill up company details"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copany Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Twitter" {...field} />
                  </FormControl>
                  <FormDescription>At least 80 character</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="htpps://twitter.com" {...field} />
                    </FormControl>
                    <FormDescription>At least 80 character</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-45">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>

                        <SelectContent>
                          {LOCATION_OPTIONS.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                              {col.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {" "}
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-45">
                            <SelectValue placeholder="Employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {EMPLOYEE_OPTIONS.map((col) => (
                              <SelectItem key={col.id} value={col.id}>
                                {col.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-45">
                          <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {LOCATION_OPTIONS.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                              {col.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dateFounded"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[450px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputSkills
                form={form}
                name="techStack"
                label="Add Tech Stack"
              />
            </div>
          </FieldInput>

          <FieldInput
            title="About Company"
            subtitle="Brief description for our money"
          >
            <CKEditor
              form={form}
              name="description"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
