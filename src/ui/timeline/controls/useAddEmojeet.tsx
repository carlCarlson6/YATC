import { useState } from "react";
import { api } from "../../api";
import { useTimeline } from "../store";

export const useAddEmojeet = () => {
  const addEmojeet = useTimeline(x => x.addEmojeet);
  const [open, setOpen] = useState(false);
  const [emoji, setEmoji] = useState("");
  const { mutate, isLoading } = api.publishEmojeet.useMutation({
    onSuccess: (result) => {
      addEmojeet(result); // TODO
      setEmoji("");
      setOpen(false);
    }
  });
  return {
    emoji,
    isOpen: open,
    setIsOpen: setOpen,
    onClose: () => setEmoji(""),
    setEmoji,
    send: () => mutate({ emoji }),
    canSend: emoji.length > 0,
    isSending: isLoading
  };
};
