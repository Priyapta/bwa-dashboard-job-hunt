import OverViewForms from "@/components/forms/overfiewForms";
import SocialLinksForm from "@/components/forms/SocialLinksForm";
import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function SettingsPage() {
  return (
    <div>
      <div className="font-semibold text-3xl mb-5">Settings</div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="social">Social links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverViewForms />
        </TabsContent>
        <TabsContent value="social">
          <SocialLinksForm />
        </TabsContent>
        <TabsContent value="teams">
          <div>teams</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
