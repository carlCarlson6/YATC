import type { Emojeet } from "./EmojiTweet";
import { addUserData, buildTimelineFromDb } from "./buildTimeline";
import { drizzleDb } from "../infrastructure/drizzle";
import { EmojiEntity } from "../publish-emojeet/emojis.drizzle.schema";

const getTimeline = ({ fetchEmojeets, addUserData }: {
  fetchEmojeets: (userId: string) => Promise<EmojiEntity[]>;
  addUserData: (tweets: EmojiEntity[]) => Promise<Emojeet[]>;
}) => async (userId: string) => {
  const builtTimeline = await fetchEmojeets(userId);
  return await addUserData(builtTimeline);
};

export default getTimeline({
  fetchEmojeets: buildTimelineFromDb(drizzleDb),
  addUserData: addUserData(drizzleDb)
})