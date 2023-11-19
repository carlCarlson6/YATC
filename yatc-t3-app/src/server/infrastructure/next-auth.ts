import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "yact/env.mjs";
import { db } from "yact/server/infrastructure/drizzle";
import { mysqlTable } from "yact/server/infrastructure/drizzle/base.drizzle.schema";

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
  adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
