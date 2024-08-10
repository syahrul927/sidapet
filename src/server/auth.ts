import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth"
import { type Adapter } from "next-auth/adapters"
import { type DefaultJWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import { env } from "~/env"
import { db } from "~/server/db"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"]
    }
}
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
    }
}

const loginUserSchema = z.object({
    // username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    email: z.string().email(),
})

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        jwt: ({ token, account, user }) => {
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            return session
        },
    },
    secret: env.NEXTAUTH_SECRET ?? "",
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 30 * 60,
    },
    adapter: PrismaAdapter(db) as Adapter,
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        Credentials({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = loginUserSchema.parse(credentials)
                const user = await db.user.findUnique({
                    where: {
                        email,
                    },
                })
                if (!user) return null

                const isPasswordValid = bcrypt.compareSync(
                    password,
                    user.password,
                )

                if (!isPasswordValid) return null

                return user
            },
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
