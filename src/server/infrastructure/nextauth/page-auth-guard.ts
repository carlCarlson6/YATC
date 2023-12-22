import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import type { User } from "src/server/user/userProfile.drizzle.schema";

type AuthGuardResult = {
  result: "unauthenticated",
  redirectReturn: {
    redirect: {
      destination: "/",
      permanent: false
    }
  }
} | {
  result: "authenticated",
  user: User
}

export const authPageGuard = async (context: GetServerSidePropsContext): Promise<AuthGuardResult> => {
  const session = await getSession(context);
  if (!session) {
		return {
      result: "unauthenticated",
      redirectReturn: {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  }

  return {
    result: "authenticated",
    user: {
      id: session.user.id,
      name: session.user.name,
      avatar: session.user.image
    }
  }
}