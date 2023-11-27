import { useState } from "react";
import { api } from "../../api";
import { useTimeline } from "../store";

export const useAddTweet = () => {
  const addTweet = useTimeline(x => x.addTweet);
  const [open, setOpen] = useState(false);
  const [newTweetText, setNewTweetText] = useState("");
  const { mutate, isLoading } = api.sendTweet.useMutation({
    onSuccess: (result) => {
      addTweet(result);
      setNewTweetText("");
      setOpen(false);
    }
  });

  const textColor: "indigo" | "red" = newTweetText.length < 280 ? "indigo" : "red";
  return {
    newTweet: {
      text: newTweetText,
      progress: newTweetText.length / 280,
      color: textColor,
      length: newTweetText.length,
    },
    form: {
      isOpen: open,
      setIsOpen: setOpen,
      onClose: () => setNewTweetText(""),
      setText: setNewTweetText,
      send: () => mutate({ text: newTweetText }),
      canSend: newTweetText.length <= 0 || newTweetText.length > 280,
      isSending: isLoading
    }
  };
};
