import { createTRPCRouter } from "yact/server/infrastructure/trpc";

export const appRouter = createTRPCRouter({});

export type AppRouter = typeof appRouter;
