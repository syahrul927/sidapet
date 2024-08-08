import Link from "next/link"
import Logo from "~/components/dashboard/logo"

const HeaderMobile = () => {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-3">
            <nav className="flex flex-col items-center gap-5 text-lg font-medium ">
                <Link
                    href="/public"
                    className="flex items-center gap-1 rounded-lg py-1.5"
                >
                    <Logo />
                    {/* <GhostIcon className="h-6 w-6 animate-pulse" /> */}
                    <span className="font-mono font-bold">SIDAPET</span>
                </Link>
            </nav>
        </header>
    )
}
export default HeaderMobile
