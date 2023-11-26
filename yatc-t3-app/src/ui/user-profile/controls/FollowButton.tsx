import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { ButtonLoaderIcon } from "yact/ui/ButtonLoaderIcon";
import { api } from "yact/ui/api";
import { useRouter } from 'next/navigation';

const useFollowAction = (isAlreadyFollowing: boolean) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const { mutate, isLoading } = api.follow.useMutation({ onSuccess: _ => {
    setIsRefreshing(true);
    router.refresh();
  }});
  return {
    isExecuting: isLoading || isRefreshing,
    execute: mutate
  }
}

export const FollowButton: React.FC<{ followed: boolean; userId: string }> = ({ followed, userId }) => {
  const { isExecuting, execute } = useFollowAction(followed);
  return (
    <Button
      variant={'outline'}
      style={{ cursor: 'pointer' }}
      onClick={_ => execute({userToFollow: userId})}
    >{ !isExecuting ?
      <FollowButtonIcon followed={followed}/> :
      <ButtonLoaderIcon />
    }
    </Button>
  );
};

const FollowButtonIcon: React.FC<{followed: boolean}> = ({followed}) => (<> 
{ followed ?
  <SlUserFollowing /> :
  <SlUserFollow />
}</>);