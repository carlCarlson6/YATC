import NextAuth from "next-auth";

import { authOptions } from "yact/server/infrastructure/nextauth";

export default NextAuth(authOptions);
