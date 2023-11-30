import type { QStashPublisher } from "../infrastructure/qstash";
import type { UpdateUserTimelineCommand } from './handleUpdateUserTimeline';

export type SendUpdateUserTimeline = ReturnType<typeof sendUpdateUserTimelineWithQStash>;

export const sendUpdateUserTimelineWithQStash = (qstash: QStashPublisher, appUrl: string) => async (command: UpdateUserTimelineCommand) => {
  await qstash(`${appUrl}/api/qstash`, {
    type: 'update-user-timeline',
    payload: JSON.stringify(command)
  });
}