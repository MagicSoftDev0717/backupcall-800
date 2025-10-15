

// app/api/auth/[...nextauth]/route.ts
// import NextAuth, { NextAuthConfig } from "next-auth";
import { type AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil", // ✅ matches your installed stripe version types
});

export const authConfig: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            // Request offline access + People API for contact sync
            authorization: {
                params: {
                    scope:
                        "openid email profile https://www.googleapis.com/auth/contacts.readonly",
                    access_type: "offline",
                    prompt: "consent",
                    include_granted_scopes: "false"  // explicitly set to false
                },
            },
            profile(profile) {
                // Map Google profile to our User shape extras
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    // googleSub gets set below in signIn callback (we have user id there)
                };
            },
        }),

        Credentials({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(creds) {
                if (!creds?.email || !creds?.password) return null;
                const user = await prisma.user.findUnique({ where: { email: creds.email } });
                if (!user || !user.passwordHash) return null;
                const ok = await bcrypt.compare(creds.password, user.passwordHash);
                return ok ? { id: user.id, email: user.email, name: user.name ?? undefined } : null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            // Attach our DB user id and stripeId to the token
            if (user) {
                const u = await prisma.user.findUnique({ where: { email: user.email! } });
                token.uid = u?.id;
                token.stripeId = u?.stripeId;
            }
            // Optionally attach provider for client debug
            if (account) token.provider = account.provider;
            return token;
        },
        async session({ session, token }) {
            if (token?.uid) {
                (session.user as any).id = token.uid;
                (session.user as any).stripeId = token.stripeId ?? null;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google" && user?.email) {
                // Upsert the user
                const dbUser = await prisma.user.upsert({
                    where: { email: user.email },
                    update: { googleSub: account.providerAccountId },
                    create: {
                        email: user.email,
                        name: user.name ?? null,
                        googleSub: account.providerAccountId,
                    },
                });

                // Ensure Account table has a Google link
                await prisma.account.upsert({
                    where: {
                        provider_providerAccountId: {
                            provider: "google",
                            providerAccountId: account.providerAccountId,
                        },
                    },
                    update: {},
                    create: {
                        userId: dbUser.id,
                        type: account.type,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                        access_token: account.access_token,
                        refresh_token: account.refresh_token,
                        expires_at: account.expires_at,
                        token_type: account.token_type,
                        scope: account.scope,
                        id_token: account.id_token,
                    },
                });
            }
            return true;
        }


    },

    events: {
        async signIn({ user }) {
            // Create Stripe customer on first sign-in
            if (!user?.email) return;
            const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
            if (dbUser && !dbUser.stripeId) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: dbUser.name || undefined,
                });
                await prisma.user.update({
                    where: { id: dbUser.id },
                    data: { stripeId: customer.id },
                });
            }
        },
    },

    // IMPORTANT: Set NEXTAUTH_SECRET / AUTH_SECRET in env
    secret: process.env.NEXTAUTH_SECRET,
};

// const handler = NextAuth(authConfig);

// // export { handler as GET, handler as POST };
// export const GET = handler as unknown as import("next").NextRequest;
// export const POST = handler as unknown as import("next").NextRequest;
