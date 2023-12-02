import { kv } from "@vercel/kv";
import type { AppCache } from "src/server/core/AppCache";

export const vercelKvCache: AppCache = {
  read: async <T>(id: string) => {
    const element = await kv.get<T>(id);
    return element;
  },
  
  upsert: async <T>(id: string, obj: T) => {
    await kv.set(id, obj);
  }
}