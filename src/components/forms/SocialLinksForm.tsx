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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CompanySocialMedia } from "@prisma/client";
type SocialMediaFormProps = {
  detail: CompanySocialMedia | undefined;
};
function SocialLinksForm({ detail }: SocialMediaFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof SocialMediaFormSchema>>({
    resolver: zodResolver(SocialMediaFormSchema),
    defaultValues: {
      facebook: detail?.facebook ?? "",
      instagram: detail?.instagram ?? "",
      twitter: detail?.twitter ?? "",
      youtube: detail?.youtube ?? "",
      linkedin: detail?.linkedin ?? "",
    },
  });
  console.log(detail);
  const onSubmit = async (val: z.infer<typeof SocialMediaFormSchema>) => {
    try {
      const body = {
        ...val,
        companyId: session?.user.id,
      };
      await fetch("/api/company/social-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      await router.refresh();
      toast("Edit Social Media Success");
    } catch (error) {
      toast("Please Try Again");
      console.log(error);
    }
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
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin</FormLabel>
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
