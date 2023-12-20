import { env } from "src/env.mjs"
import type { DomainCommandsTypes, DomainEventsTypes } from "../core/domain";

export const qStashPublisher = async (destination: string, message: {payload: string, type: DomainEventsTypes | DomainCommandsTypes}) => {
  console.log("publishing event", message.type, "to", destination);
  const result = await fetch(
    `${env.QSTASH_URL}/${destination}`,
    {
      method: "POST",
      body: message.payload,
      headers: {
        "Authorization": `Bearer ${env.QSTASH_TOKEN}`,
        "Content-Type": "applicatioj/json",
        "Upstash-Forward-MessageType": message.type
      }
    });
  console.log("publish action result", result.status);
};

export type QStashPublisher = typeof qStashPublisher;