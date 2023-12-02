import { env } from "src/env.mjs"
import type { DomainCommandsTypes, DomainEventsTypes } from "../core/domain";

export const qStashPublisher = (destination: string, message: {payload: string, type: DomainEventsTypes | DomainCommandsTypes}) => {
  console.log("sending to url", `${env.QSTASH_URL}/${destination}`)
  return fetch(
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
};

export type QStashPublisher = typeof qStashPublisher;