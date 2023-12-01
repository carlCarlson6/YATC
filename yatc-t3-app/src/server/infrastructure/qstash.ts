import { env } from "yact/env.mjs"
import type { DomainCommandsTypes, DomainEventsTypes } from "../domain";

export const qStashPublisher = (destination: string, message: {payload: string, type: DomainEventsTypes | DomainCommandsTypes}) => fetch(
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

export type QStashPublisher = typeof qStashPublisher;