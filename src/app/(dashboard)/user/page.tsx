"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DataTable } from "~/components/ui/table/data-table";
import { api } from "~/trpc/react";
import { columnUserDataTable } from "./components/table/column-user";
import { DataTableToolbarUser } from "./components/table/data-table-toolbar";

const UserPage = () => {
  const { data } = api.user.findAll.useQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Akses User</CardTitle>
        <CardDescription>
          Daftar user yang dapat login ke aplikasi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columnUserDataTable}
          data={
            data?.map((user) => ({
              ...user,
            })) ?? []
          }
          pagination
          toolbar={DataTableToolbarUser}
        />
      </CardContent>
    </Card>
  );
};
export default UserPage;
