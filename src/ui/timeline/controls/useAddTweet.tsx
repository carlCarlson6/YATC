import { useState } from "react";
import { api } from "../../api";
import { useTimeline } from "../store";

export const useAddTweet = () => {
  const _ = useTimeline(x => x.addTweet);
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState("");
  const { mutate, isLoading } = api.publishTweet.useMutation({
    onSuccess: () => {
      //addTweet(result); // TODO
      setEmoji("");
      setOpen(false);
    }
  });
  return {
    emoji,
    form: {
      isOpen: open,
      setIsOpen: setOpen,
      onClose: () => setEmoji(""),
      setEmoji,
      send: () => mutate({ text: emoji }),
      canSend: emoji.length > 0,
      isSending: isLoading
    }
  };
};
