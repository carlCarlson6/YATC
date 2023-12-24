import { AuthValidator } from "src/server/auth/AuthValidator";
import { DrizzleDb } from "src/server/infrastructure/drizzle";
import { z } from "zod";
import { emojisReactionsTable } from "./emojisReactions.drizzle.schema";
import { randomUUID } from "crypto";
import { emojisTable } from "../publish/emojis.drizzle.schema";
import { eq } from "drizzle-orm";

const publishReactionInputSchema = z.object({
  reaction: z.string().emoji().min(1),
  emojiId:  z.string().uuid().min(1)
})

export const publishReaction = (db: DrizzleDb, auth: AuthValidator) => async (input: z.infer<typeof publishReactionInputSchema>) => {
  const publisher = await auth();
  const {reaction, emojiId} = await publishReactionInputSchema.parseAsync(input);

  const checkEmojiExistResult = await db.select().from(emojisTable).where(eq(emojisTable.id, emojiId)).execute();
  if (!checkEmojiExistResult.at(0)) {
    throw new Error("emoji not found");
  }

  const insert = {
    id: randomUUID(),
    reaction,
    reactsTo: emojiId,
    publishedBy: publisher.id,
    publishedAt: `${Date.now()}`
  };
  await db.insert(emojisReactionsTable).values(insert).execute();
}