"use client";
import { SocialMediaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function SocialLinksForm() {
  const form = useForm<z.infer<typeof SocialMediaFormSchema>>({
    resolver: zodResolver(SocialMediaFormSchema),
    defaultValues: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
  });

  const onSubmit = (val: z.infer<typeof SocialMediaFormSchema>) => {
    console.log(val);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FieldInput
          title="Basic Information"
          subtitle="Add elswhere  links to your ocmpnay profile. you can ad only username without full hhtp.links"
        >
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://facebook.com/twitter"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/twitter"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/twitter" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com/twitter" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </FieldInput>
        <div className="flex justify-end">
          {" "}
          <Button size="lg"> Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}

export default SocialLinksForm;
