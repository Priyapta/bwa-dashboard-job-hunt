import React from "react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { PartyPopperIcon } from "lucide-react";
export default function JobDetail() {
  return (
    <div>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className=" col-span-2 space-y-8">
          <div className="text-3xl font-semibold">Description</div>
          <div className="text-gray-500">
            {" "}
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              eaque tenetur ad ab, nam possimus commodi iste distinctio corrupti
              optio aliquid nobis earum praesentium odio recusandae error
              ducimus minima natus.
            </p>
          </div>
          <div className="text-3xl font-semibold">Responsibility</div>
          <div className="text-gray-500">
            {" "}
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              eaque tenetur ad ab, nam possimus commodi iste distinctio corrupti
              optio aliquid nobis earum praesentium odio recusandae error
              ducimus minima natus.
            </p>
          </div>
          <div className="text-3xl font-semibold">Who You Are</div>
          <div className="text-gray-500">
            {" "}
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              eaque tenetur ad ab, nam possimus commodi iste distinctio corrupti
              optio aliquid nobis earum praesentium odio recusandae error
              ducimus minima natus.
            </p>
          </div>
          <div className="text-3xl font-semibold">Nice-To-Haves</div>
          <div className="text-gray-500">
            {" "}
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              eaque tenetur ad ab, nam possimus commodi iste distinctio corrupti
              optio aliquid nobis earum praesentium odio recusandae error
              ducimus minima natus.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-3xl font-semibold">About this role</div>
          <div className=" shadow p-3 text-center mt-6">
            1 <span className="text-gray-500">of 10 capacity</span>
          </div>
          <Progress value={10} />
          <div className="mb-10 space-y-5">
            <div className="flex justify-between">
              <div className="text-grey-500">Apply Before</div>
              <div className="font-semibold">12 Aug 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-grey-500">Job Posted</div>
              <div className="font-semibold">12 Aug 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-grey-500">Job Type</div>
              <div className="font-semibold">Full Time</div>
            </div>
            <div className="flex justify-between">
              <div className="text-grey-500">Salary </div>
              <div className="font-semibold">$100 - $1000</div>
            </div>
          </div>
          <Separator />
          <div className="my-10">
            <div className="text-3xl font-semibold mb-4">Required Skills</div>

            <div className="space-x-5">
              {" "}
              {["HTML", "JavaScript"].map((item: string, i: number) => (
                <Badge variant="outline" key={i}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="text-3xl font-semibold">Perks & Benefits </div>
      <div className="text-gray-500">
        This job comes with several perks and benefits
        <div className="grid grid-cols-4 gap-5 mt-9">
          {[0, 1, 2].map((item: number) => (
            <div key={item}>
              <PartyPopperIcon />
              <div className="text-lg font-semibold mb-3">Full Healthcare</div>
              <div className="text-gray-500">
                We believe in thriving communities and that statrt with our team
                being happy and healthy
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
