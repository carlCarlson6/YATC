import NextAuth from "next-auth";

import { authOptions } from "yact/server/infrastructure/next-auth";

export default NextAuth(authOptions);
