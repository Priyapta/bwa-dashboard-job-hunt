"use client";
import React, { FC } from "react";
import { Button } from "../../ui/button";
import { Ghost } from "lucide-react";
import { FaBuilding, FaHome, FaRegBuilding } from "react-icons/fa";
import {
  AiOutlineBook,
  AiOutlineBuild,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSchedule,
} from "react-icons/ai";
import { BsBuildings, BsPeople } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/")}
            >
              <AiOutlineHome className="mr-2 text-lg" /> Home
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <AiOutlineMessage className="mr-2 text-lg" /> Messages
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <BsBuildings className="mr-2 text-lg" /> Company Profiles
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <BsPeople className="mr-2 text-lg" /> All Applicants
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/job-listings")}
            >
              <IoDocumentTextOutline className="mr-2 text-lg" /> Job Listings
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
            >
              <AiOutlineSchedule className="mr-2 text-lg" /> My Schedule
            </Button>
          </div>
        </div>
        <div className="space-y-4 py-4">
          <div className="mb-2 px-4 text-lg font-semibold">
            <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/settings")}
            >
              <GoGear className="mr-2 text-lg" /> Settings
            </Button>
            <Button
              variant={"ghost"}
              className="w-full text-red-500 hover:bg-red-200 hover:text-red-500 justify-start rounded-none "
            >
              <AiOutlineLogout className="mr-2 text-lg" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
