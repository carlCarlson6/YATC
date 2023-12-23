"use client"

import { Avatar, Box, Button, Dialog, DialogContent, Grid, Separator, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { User } from "src/server/user/userProfile.drizzle.schema";
import findUsers from "src/server/user/find/findUsers";

export const SearchUsersButton = () => {
  //const [nameToFind, setNameToFind] = useState("");
  const [foundUsers, setFoundUsers] = useState<User[]>([]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant={'outline'} style={{ cursor: 'pointer' }}>
          <MagnifyingGlassIcon />
        </Button>
      </Dialog.Trigger>
      <DialogContent>
        <Box pb={'2'}>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input 
              placeholder="search your friends (use the discord nickname)" 
              onChange={async e => {
                const users = await findUsers({userName: e.target.value});
                setFoundUsers(users);
              }} 
            />
          </TextField.Root>
        </Box>
        <Separator size={'4'}/>
        <Grid 
          pt={'2'} 
          columns={'5'} 
          width={'auto'}
        >{foundUsers.map(x => 
          <a key={x.id} href={`/user/${x.name}`}>
            <Avatar src={x.avatar} fallback={x.name}/>
          </a>
        )}</Grid>
      </DialogContent>
    </Dialog.Root>
  );
};
