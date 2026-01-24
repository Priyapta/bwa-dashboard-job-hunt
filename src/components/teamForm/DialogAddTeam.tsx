import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { TeamFormSchema } from "@/lib/form-schema";
import z from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
function DialogAddTeam() {
  const form = useForm<z.infer<typeof TeamFormSchema>>({
    resolver: zodResolver(TeamFormSchema),
    defaultValues: {
      name: "",
      instagram: "",
      linkedin: "",
      position: "",
    },
  });

  const onSubmit = (val: z.infer<typeof TeamFormSchema>) => {
    console.log(val);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <PlusIcon className="w-4 h-4" /> Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
          <DialogDescription>Fit the field to add new team</DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postion</FormLabel>
                  <FormControl>
                    <Input placeholder="Position" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 justify-between gap-5">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Instagram" {...field} />
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
                      <Input placeholder="Linkedin" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start">
                <Button size="lg">Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAddTeam;
