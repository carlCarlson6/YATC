"use client"

import { Avatar, Box, Button, Dialog, DialogContent, Grid, Separator, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { type ChangeEvent, useState } from "react";
import type { User } from "src/server/user/profile/userProfile.drizzle.schema";
import {findUsers} from "src/server/user/find/findUsers";
import { SyncLoader } from "react-spinners";

export const SearchUsers = () => {
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  return (
    <Dialog.Root>
      <SearchUsersButton />
      <DialogContent>
        <SearchUsersInput 
          setFoundUsers={setFoundUsers} 
          setIsSearching={setIsSearching}
        />
        <Separator size={'4'}/>
        <FoundUsersList 
          users={foundUsers} 
          searching={isSearching}
        />
      </DialogContent>
    </Dialog.Root>
  );
};

const SearchUsersButton = () => (<>
  <Dialog.Trigger>
    <Button variant={'outline'} style={{ cursor: 'pointer' }}>
      <MagnifyingGlassIcon />
    </Button>
  </Dialog.Trigger>
</>);

const SearchUsersInput = ({
  setFoundUsers,
  setIsSearching
}: {
  setFoundUsers: (users: User[]) => void,
  setIsSearching: (searching: boolean) => void;
}) => {
  const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    const users = await findUsers({ userName: e.target.value });
    setFoundUsers(users);
    setIsSearching(false);
  };
  return (<>
    <Box pb={'2'}>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="search your friends (use the discord nickname)"
          onChange={handleSearchInput} />
      </TextField.Root>
    </Box>
  </>);
  };

const FoundUsersList = ({
  users,
  searching
}: {
  users: User[],
  searching: boolean
}) => (<>{searching 
  ? <SyncLoader size={7} color="#9EB1FF" speedMultiplier={0.5} />
  : <Grid 
      pt={'2'} 
      columns={'5'} 
      width={'auto'}
    >{users.map(x => 
      <a key={x.id} href={`/user/${x.name}`}>
        <Avatar src={x.avatar} fallback={x.name}/>
      </a>
    )}</Grid>
}</>);