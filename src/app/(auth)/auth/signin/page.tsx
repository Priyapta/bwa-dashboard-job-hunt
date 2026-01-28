"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "next-auth/react";
import { title } from "process";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function SignInPage() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    const authenticated = await signIn("credentials", {
      ...val,
      redirect: false,
    });
    if (authenticated?.error) {
      toast.error("Email or Password maybe wrong");
      return;
    }
    await router.push("/");
  };
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border border-border p-5">
          <div className="font-semibold text-center text-2xl mb-2">
            Login your account
          </div>
          <div className="text-sm text-gray-500">
            Enter your email to access dashboard
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormDescription>At least 5 character</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormDescription>At least 8 character</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Sign In</Button>
              <div className="text-sm">
                {" "}
                Don't have account{" "}
                <Link href="/auth/signup" className="text-primary">
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
