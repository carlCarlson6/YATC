import NextAuth from "next-auth";

import { authOptions } from "src/server/infrastructure/nextauth";

export default NextAuth(authOptions);
