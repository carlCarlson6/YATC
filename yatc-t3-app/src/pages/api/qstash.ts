import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/dist/nextjs";
import { newTweetPublishedSchema, type DomainMessagesTypes, domainMessagesTypesSchema } from "src/server/core/domain";
import { match } from 'ts-pattern';
import { findTweetOnDrizzleDb, updateUserTimeline, updateUserTimelineCommanSchema } from "src/server/timeline/handleUpdateUserTimeline";
import { drizzleDb } from "src/server/infrastructure/drizzle";
import { sendUpdateUserTimelineWithQStash } from "src/server/timeline/sendUpdateUserTimeline";
import { qStashPublisher } from "src/server/infrastructure/qstash";
import { getServerUrl } from "src/server/infrastructure/getServerUrl";
import { vercelKvCache } from "src/server/infrastructure/vercelKv";
import { handleNewTweetPublished, loadFollowersFromDrizzleDb } from "src/server/publish-tweet/handleNewTweetPublished";
import { buildTimelineFromDb } from "src/server/timeline/build-timeline";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("hit message qstash message handler", 'recived evnet', req.headers.messagetype)
  const eventType = domainMessagesTypesSchema.parse(req.headers.messagetype);
  await match(eventType)
    .with("tweet-published", executeNewTweetPublishedHandler(req))
    .with("user-followed", () => Promise.resolve())
    .with("update-user-timeline", executeUpdateUserTimelineHandler(req))
    .exhaustive();
  res.status(200).send({});
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};

const executeNewTweetPublishedHandler = (req: NextApiRequest) => () => handleNewTweetPublished({
  loadFollower: loadFollowersFromDrizzleDb(drizzleDb),
  publish: sendUpdateUserTimelineWithQStash(qStashPublisher, getServerUrl(req)),
  updateTimeline:  updateUserTimeline({
    cache: vercelKvCache,
    findTweet: findTweetOnDrizzleDb(drizzleDb),
    buildTimeline: buildTimelineFromDb(drizzleDb),
  })
})(newTweetPublishedSchema.parse(JSON.parse(req.body as string)));

const executeUpdateUserTimelineHandler = (req: NextApiRequest) => () => updateUserTimeline({
  cache: vercelKvCache,
  findTweet: findTweetOnDrizzleDb(drizzleDb),
  buildTimeline: buildTimelineFromDb(drizzleDb),
})(updateUserTimelineCommanSchema.parse(JSON.parse(req.body as string)));