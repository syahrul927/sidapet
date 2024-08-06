import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            const path = req.nextUrl.pathname
            if (path.startsWith("/public") || token) {
                return true
            }
            return false
        },
    },
})

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/((?!api|auth|_next/static|_next/*.png|_next/*.webp|_next/*.jpg|favicon.ico|favicon.png|_next/image|images|auth|manifest.json).*)",
        "/",
    ],
}
