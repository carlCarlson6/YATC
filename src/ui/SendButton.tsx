"use client";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import React from "react";
import { SyncLoader } from "react-spinners";
import { UploadIcon } from "@radix-ui/react-icons";

export const SendButton: React.FC<{
  isSending: boolean;
  canSend: boolean;
  send: () => void;
}> = ({
  isSending, canSend, send,
}) => (<>
  <Flex justify={'end'}>
    {isSending 
      ? <Box pt={'1'}>
        <SyncLoader
          size={7}
          color="#9EB1FF"
          speedMultiplier={0.5} />
      </Box> 
      : <IconButton
          color="plum"
          variant="outline"
          style={{ cursor: 'pointer' }}
          disabled={!canSend}
          onClick={send}
      >
        <UploadIcon />
      </IconButton>
    }
  </Flex>
</>);
