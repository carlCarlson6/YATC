"use client"

import { useState } from "react";
import { useTimeline } from "../store";
import { publishEmojeetAction } from "src/server/publish-emojeet/api";

export const useAddEmojeet = () => {
  const addEmojeet = useTimeline(x => x.addEmojeet);
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [isSending, setIsSending] = useState(false);
  return {
    emoji,
    isOpen: open,
    setIsOpen: setOpen,
    setEmoji,
    send: async () => {
      setIsSending(true);
      const result = await publishEmojeetAction({emoji});
      addEmojeet(result);
      setEmoji("");
      setOpen(false);
      setIsSending(false);
    },
    canSend: emoji.length > 0,
    isSending
  };
};
