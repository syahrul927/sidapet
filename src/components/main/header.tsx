import {
    CheckCircleIcon,
    Menu,
    PlusCircleIcon,
    UsersIcon,
    type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import Logo from "../dashboard/logo"
import { Button, buttonVariants } from "../ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet"
import DropdownAccount from "./dropdown-account"
import { cn } from "~/lib/cn"

const MenuItems: { label: string; href: string; icon: LucideIcon }[] = [
    {
        label: "Antrian Dokumen",
        href: "/",
        icon: PlusCircleIcon,
    },
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
]
const Header = () => {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-5 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm ">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-1.5 font-mono text-base font-semibold transition-all hover:text-xl hover:font-extrabold",
                    )}
                >
                    <Logo />
                    {/* <GhostIcon className="h-6 w-6 animate-pulse" /> */}
                    <span>SIDAPET</span>
                </Link>
                {MenuItems.map((menu) => (
                    <Link key={menu.label} href={menu.href} className="">
                        <Button size={"sm"} variant={"ghost"}>
                            <menu.icon size={"14"} className="mr-2" />
                            {menu.label}
                        </Button>
                    </Link>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <SheetClose asChild>
                            <Link
                                href="/"
                                className="flex gap-2 text-lg font-semibold"
                            >
                                <Logo />
                                {/* <GhostIcon className="h-6 w-6" /> */}
                                <span className="font-mono font-bold">
                                    SIDAPET
                                </span>
                            </Link>
                        </SheetClose>
                        {MenuItems.map((menu) => (
                            <SheetClose key={menu.label} asChild>
                                <Link
                                    href={menu.href}
                                    className="flex items-center text-muted-foreground hover:text-foreground"
                                >
                                    <menu.icon size={"14"} className="mr-2" />
                                    {menu.label}
                                </Link>
                            </SheetClose>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            {/* <div className="flex w-full flex-row-reverse">
        <ThemeToggle />
      </div> */}
            <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
                <DropdownAccount />
            </div>
        </header>
    )
}

export default Header
