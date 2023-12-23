"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./infrastructure/nextauth";
import type { AuthValidator } from "./AuthValidator";

export const nextAuthValidator: AuthValidator = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("not authenticated");
  }

  return {
    id: session.user.id,
    name: session.user.name,
    avatar: session.user.image
  };
};
