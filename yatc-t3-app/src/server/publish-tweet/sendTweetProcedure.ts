import z from "zod";
import { publishNewTweet, sendNewTweetPublishedWithQStash, storeTweetWithDrizzle } from "./publishNewTweet";
import { qStashPublisher } from "../infrastructure/qstash";
import { protectedProcedure } from "../infrastructure/trpc";

export const publishTweetProcedure = protectedProcedure
  .input(z.object({
    text: z.string().min(1).max(280)
  }))
  .mutation(({ctx: {db, session, serverUrl}, input}) => publishNewTweet({
    storeTweet: storeTweetWithDrizzle(db),
    sendNewTweetPublished: sendNewTweetPublishedWithQStash(qStashPublisher, serverUrl),
  })({ id: session.user.id, name: session.user.name, avatar: session.user.image }, input.text));
