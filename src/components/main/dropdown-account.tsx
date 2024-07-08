"use client";
import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

const DropdownAccount = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild className="ml-auto">
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DropdownAccount;
