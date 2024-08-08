"use client"
import { CircleUser } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useMemo } from "react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const DropdownAccount = () => {
    const { data } = useSession()
    const username = useMemo(() => data?.user.name, [data])
    return (
        <DropdownMenu>
            <div className="flex items-center space-x-3">
                <p className="font-semibold">{username}</p>
                <DropdownMenuTrigger asChild className="ml-auto">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                    >
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Pengaturan</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownAccount
