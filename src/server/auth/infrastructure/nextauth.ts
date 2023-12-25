import { type DefaultSession, type NextAuthOptions, } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "src/env.mjs";
import { drizzleDb } from "src/server/infrastructure/drizzle";
import { drizzleTable } from "../../infrastructure/drizzle/drizzleTable";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string
      email: string
      image: string
    } 
    // & DefaultSession["user"]; 
    // if this we add other providers and this fields are not present we should dis-comment this line and remove name, email and image
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(drizzleDb, drizzleTable),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};
