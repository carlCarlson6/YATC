import z from 'zod';

export const domainEventsTypesSchema = z.enum(["tweet-published", "user-followed"])

export type DomainEventsTypes = z.infer<typeof domainEventsTypesSchema>;

export const newTweetPublishedSchema = z.object({
  tweetId: z.string().min(1),
  publishedBy: z.string().min(1),
});

export const domainCommandsTypes = z.enum(["update-user-timeline"]);
export type DomainCommandsTypes = z.infer<typeof domainCommandsTypes>;

export const domainMessagesTypesSchema = z.union([domainEventsTypesSchema, domainCommandsTypes]);
export type DomainMessagesTypes = z.infer<typeof domainMessagesTypesSchema>;