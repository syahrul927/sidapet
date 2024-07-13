import {
  CheckCircleIcon,
  GhostIcon,
  LucideIcon,
  Menu,
  PlusCircleIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import DropdownAccount from "./dropdown-account";

const MenuItems: { label: string; href: string; icon: LucideIcon }[] = [
  {
    label: "Request Dokumen",
    href: "/document/create",
    icon: PlusCircleIcon,
  },
  {
    label: "Dokumen Selesai",
    href: "/document/done",
    icon: CheckCircleIcon,
  },
  {
    label: "Akses User",
    href: "/user",
    icon: UsersIcon,
  },
];
const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-5 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm ">
        <Link
          href="/"
          className="flex items-center gap-1 rounded-lg px-3 py-1.5"
        >
          <GhostIcon className="h-6 w-6 animate-pulse" />
          <span className="font-mono font-bold">SIDAPET</span>
        </Link>
        {MenuItems.map((menu) => (
          <Link href={menu.href} className="">
            <Button size={"sm"} variant={"ghost"}>
              <menu.icon size={"14"} className="mr-2" />
              {menu.label}
            </Button>
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex gap-2 text-lg font-semibold">
              <GhostIcon className="h-6 w-6" />
              <span className="">SIDAPET</span>
            </Link>
            {MenuItems.map((menu) => (
              <Link
                href={menu.href}
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <menu.icon size={"14"} className="mr-2" />
                {menu.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownAccount />
      </div>
    </header>
  );
};

export default Header;
