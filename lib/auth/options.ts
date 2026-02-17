
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, Session, User } from "next-auth";
import { API_URL, NEXTAUTH_SECRET } from "@/utils/constants";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const res = await fetch(`${API_URL}auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!res.ok) return null;
                const json = await res.json();
                if (!json?.success || !json?.data?.token) return null;

                return {
                    id: String(json.data.user?.id ?? credentials.email),
                    email: json.data.user?.email ?? credentials.email,
                    accessToken: json.data.token,
                    refreshToken: json.data.refresh_token,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/auth/sign-in" },

    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as User).accessToken;
                token.refreshToken = (user as User).refreshToken;
            }
            return token;
        },
        session({ session, token }) {
            (session as Session).accessToken = token.accessToken;
            (session as Session).refreshToken = token.refreshToken;
            return session;
        },
    },
    events: {
        async signIn({ user }) {
            if ((user as User).refreshToken) {
                const cookieStore = await cookies();
                cookieStore.set('next-auth.refresh-token', (user as User).refreshToken, {httpOnly: true});
            }
        },
        async signOut() {
            const cookieStore = await cookies();
            cookieStore.delete('next-auth.refresh-token');
            cookieStore.delete('next-auth.session-token');
        }
    },
    secret: NEXTAUTH_SECRET,
};
