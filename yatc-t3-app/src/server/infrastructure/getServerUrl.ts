import type { NextApiRequest } from "next";
import absoluteUrl from "next-absolute-url";
import { env } from "src/env.mjs";

export const getServerUrl = (req: NextApiRequest) => env.LOCAL_DEV_TUNNEL ?? absoluteUrl(req).origin;