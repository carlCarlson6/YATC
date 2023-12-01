import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/dist/nextjs";
import { domainEventsTypesSchema, type DomainMessagesTypes } from "yact/server/domain";
import { match } from 'ts-pattern';
import { executeHandler as executeUpdateUserTimeline } from "yact/server/timeline/handleUpdateUserTimeline";
import { executeHandler as executeTweetPublished } from "yact/server/send-tweet/handleNewTweetPublished";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("hit message qstash message handler")
  const eventType = domainEventsTypesSchema.parse(req.headers.messagetype);
  console.log('recived event', eventType);
  await handleEvent(eventType, req);
  res.status(200).send({});
}

const handleEvent = async (eventType: DomainMessagesTypes, req: NextApiRequest) => await match(eventType)
  .with("tweet-published", executeTweetPublished(req))
  .with("user-followed", executeHandleUserFollowed(req))
  .with("update-user-timeline", executeUpdateUserTimeline(req))
  .exhaustive();

const executeHandleUserFollowed = (_: NextApiRequest) => () => Promise.resolve();

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
