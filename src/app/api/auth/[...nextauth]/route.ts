import NextAuth from "next-auth"
import type { NextRequest, NextResponse } from "next/server";
import { authOptions } from "src/server/infrastructure/nextauth"

const handler = NextAuth(authOptions) as (req: NextRequest, res: NextResponse) => void;

export { handler as GET, handler as POST }