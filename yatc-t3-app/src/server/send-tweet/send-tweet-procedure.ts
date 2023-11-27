import { protectedProcedure } from "yact/server/infrastructure/trpc";
import z from "zod";
import { saveNewTweet, sendNewTweetPublishedWithQStash, storeTweetWithDrizzle } from "./saveNewTweet";
import { qStashPublisher } from "../infrastructure/qstash";

export const sendTweetProcedure = protectedProcedure
  .input(z.object({
    text: z.string().min(1).max(280)
  }))
  .mutation(({ctx: {db, session, serverUrl}, input}) => saveNewTweet({
    storeTweet: storeTweetWithDrizzle(db),
    sendNewTweetPublished: sendNewTweetPublishedWithQStash(qStashPublisher, serverUrl),
  })({ id: session.user.id, name: session.user.name, avatar: session.user.image }, input.text));
