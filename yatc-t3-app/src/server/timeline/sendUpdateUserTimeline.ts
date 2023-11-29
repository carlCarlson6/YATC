import z from 'zod';
import type { QStashPublisher } from "../infrastructure/qstash";

export type SendUpdateUserTimeline = ReturnType<typeof sendUpdateUserTimelineWithQStash>;

export const sendUpdateUserTimelineWithQStash = (qstash: QStashPublisher, appUrl: string) => async (command: UpdateUserTimelineCommand) => {
  await qstash(`${appUrl}/api/qstash`, {
    type: 'update-user-timeline',
    payload: JSON.stringify(command)
  });
}

export const handleUpdateUserTimeline = (_: UpdateUserTimelineCommand) => {
  return Promise.resolve();
}

export const updateUserTimelineCommanSchema = z.object({
  userId:   z.string().min(1),
  tweetId:  z.string().min(1),
});

export type UpdateUserTimelineCommand = z.infer<typeof updateUserTimelineCommanSchema>;
