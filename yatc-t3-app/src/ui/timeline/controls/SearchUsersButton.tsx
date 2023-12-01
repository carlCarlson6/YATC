import { Avatar, Box, Button, Dialog, DialogContent, DialogTrigger, Grid, Separator, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { api } from "yact/ui/api";
import { useState } from "react";

export const SearchUsersButton = () => {
  const [nameToFind, setNameToFind] = useState("");
  const { data } = api.findUsers.useQuery({name: nameToFind});
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
            <TextField.Input placeholder="search your friends (use the discord nickname)" onChange={e => setNameToFind(e.target.value)} />
          </TextField.Root>
        </Box>
        <Separator size={'4'}/>
        <Grid pt={'2'} columns={'5'} width={'auto'}>{
          (data ?? []).map(x => 
            <a href={`/user/${x.name}`}>
              <Avatar src={x.avatar} fallback={x.name}/>
            </a>
          )
        }</Grid>
      </DialogContent>
    </Dialog.Root>
  );
};
