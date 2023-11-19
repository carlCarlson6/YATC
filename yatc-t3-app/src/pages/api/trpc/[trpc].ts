import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "yact/env.mjs";
import { appRouter } from "yact/server/infrastructure/trpc/root";
import { createTRPCContext } from "yact/server/infrastructure/trpc";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
      : undefined,
});
