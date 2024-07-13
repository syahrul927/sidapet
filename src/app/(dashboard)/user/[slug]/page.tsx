import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import InformationAccountTab from "./components/information-account-tab";
import PasswordTab from "./components/password-tab";
import { api } from "~/trpc/server";
import { type PageType } from "~/types/page-type";
import { redirect } from "next/navigation";

const UserDetailPage = async ({ params }: PageType) => {
  const slug = params.slug;
  const user = await api.user.findById(slug).catch((err) => {
    redirect("/user");
  });
  return (
    <Tabs defaultValue="account" className="max-w-xl">
      <TabsList>
        <TabsTrigger value="account">Informasi Akun</TabsTrigger>
        <TabsTrigger value="password">Keamanan</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <InformationAccountTab {...user} />
      </TabsContent>
      <TabsContent value="password">
        <PasswordTab id={slug} />
      </TabsContent>
    </Tabs>
  );
};
export default UserDetailPage;
