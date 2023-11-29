import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/dist/nextjs";
import { domainEventsTypesSchema, newTweetPublishedSchema, type DomainMessagesTypes } from "yact/server/domain";
import { match } from 'ts-pattern';
import { fetchFollorers, handleNewTweetPublished } from "yact/server/send-tweet/handleNewTweetPublished";
import { drizzleDb } from "yact/server/infrastructure/drizzle";
import { handleUpdateUserTimeline, sendUpdateUserTimelineWithQStash, updateUserTimelineCommanSchema } from "yact/server/timeline/sendUpdateUserTimeline";
import { qStashPublisher } from "yact/server/infrastructure/qstash";
import { getServerUrl } from "yact/server/infrastructure/getServerUrl";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("hit message qstash message handler")
  const eventType = domainEventsTypesSchema.parse(req.headers.messagetype);
  console.log('recived event', eventType);
  await handleEvent(eventType, req);
  res.status(200).send({});
}

const handleEvent = async (eventType: DomainMessagesTypes, req: NextApiRequest) => await match(eventType)
  .with("tweet-published", () => handleNewTweetPublished({
    loadFollower: fetchFollorers(drizzleDb),
    publish: sendUpdateUserTimelineWithQStash(qStashPublisher, getServerUrl(req))
  })(newTweetPublishedSchema.parse(JSON.parse(req.body as string))))
  .with("user-followed", () => Promise.resolve())
  .with("update-user-timeline", () => handleUpdateUserTimeline(updateUserTimelineCommanSchema.parse(JSON.parse(req.body as string))))
  .exhaustive()

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
