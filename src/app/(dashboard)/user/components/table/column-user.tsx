"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type UserTableSchemaProps } from "./data/user-table-schema";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const columnUserDataTable: ColumnDef<UserTableSchemaProps>[] = [
  {
    accessorKey: "email",
    header: "Email",
    cell({ row }) {
      return (
        <Link href={`/user/${row.original.id}`}>
          <p className="font-semibold">{row.original.email}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "createdDate",
    header: "Tanggal dibuat",
    cell({ row }) {
      return (
        <p>
          {row.original.createdDate?.toLocaleDateString("id-ID", {
            dateStyle: "long",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell({ row }) {
      return (
        <Link href={`/user/${row.original.id}`}>
          <Button variant={"link"}>View Detail</Button>
        </Link>
      );
    },
  },
];
