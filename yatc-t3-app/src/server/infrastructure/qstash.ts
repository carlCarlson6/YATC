import { env } from "yact/env.mjs"

export const qStashPublisher = (destination: string, payload: string) => fetch(
  `${env.QSTASH_URL}/${destination}`, 
  {
    method: "POST",
    body: payload,
    headers: {
      "Authorization": `Bearer ${env.QSTASH_TOKEN}`,
      "Content-Type": "applicatioj/json"
    }
});

export type QStashPublisher = typeof qStashPublisher;