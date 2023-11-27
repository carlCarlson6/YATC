import type { DrizzleDb } from "../infrastructure/drizzle";
import type { QStashPublisher } from "../infrastructure/qstash";
import type { User } from "../user/user";
import { tweets, type TweetEntity } from "./tweet.drizzle.schema";

export const saveNewTweet = ({storeTweet, sendNewTweetPublished}: {
  storeTweet: (tweet: TweetEntity) => Promise<void>,
  sendNewTweetPublished: (tweet: TweetEntity) => Promise<void>,
}) => async (
  userPublisher: User,
  tweetText: string
) => {
  const tweet = {
    id: crypto.randomUUID(),
    text: tweetText,
    publishedBy: userPublisher.id,
    publishedAt: Date.now()/1000,
  };

  await storeTweet(tweet);
  await sendNewTweetPublished(tweet);

  return ({
    ...tweet,
    user: userPublisher
  });
};

export const storeTweetWithDrizzle = (db: DrizzleDb) => async (tweet: TweetEntity) => {
  await db.insert(tweets).values(tweet).execute();
}

export const sendNewTweetPublishedWithQStash = (qstash: QStashPublisher, appUrl: string) => async (tweet: TweetEntity) => {
  console.info("sending evet [new tweet published] to", appUrl);
  const response = await qstash(appUrl, JSON.stringify(tweet));
  const parsedResponse = await response.json();
  console.log("response", parsedResponse)
}