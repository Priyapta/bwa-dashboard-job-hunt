import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OverViewForms from "@/components/forms/overfiewForms";
import SocialLinksForm from "@/components/forms/SocialLinksForm";
import TeamsForm from "@/components/forms/TeamsForm";

import Applicants from "@/components/organisms/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";

import prisma from "../../../../lib/prisma";

async function getDetailCompany() {
  const session = await getServerSession(authOptions);

  const company = await prisma.company.findFirst({
    where: { id: session?.user.id },
    include: {
      Companyoverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
    },
  });
  return company;
}
export default async function SettingsPage() {
  const company = await getDetailCompany();
  console.log(company);
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
          <OverViewForms detail={company?.Companyoverview[0]} />
        </TabsContent>
        <TabsContent value="social">
          <SocialLinksForm detail={company?.CompanySocialMedia[0]} />
        </TabsContent>
        <TabsContent value="teams">
          <TeamsForm teams={company?.CompanyTeam} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
