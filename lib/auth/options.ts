import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { API_URL, NEXTAUTH_SECRET } from "@/utils/constants";
import { cookies } from "next/headers";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}

interface CustomUser {
    id: string;
    name: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                remember_me: { label: "Remember Me", type: "checkbox" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }

                const res = await fetch(`${API_URL}auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                        remember_me: !!credentials.remember_me,
                    }),
                });

                const json = await res.json();

                if (!res.ok || !json.success) {
                    throw new Error(json.message || "Invalid credentials");
                }

                return {
                    id: String(json.data.id),
                    name: json.data.name,
                    email: json.data.email,
                    role: json.data.role,
                    accessToken: json.token,
                } as CustomUser;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as CustomUser).role;
                token.accessToken = (user as CustomUser).accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
                role: token.role as string,
            };

            session.accessToken = token.accessToken as string;

            return session;
        },
    },

    events: {
        async signOut() {
            const cookieStore = await cookies();
            cookieStore.delete('next-auth.session-token');
        }
    },

    secret: NEXTAUTH_SECRET,
};