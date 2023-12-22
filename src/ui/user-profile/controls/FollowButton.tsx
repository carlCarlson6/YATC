import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import ButtonLoaderIcon from "src/ui/ButtonLoaderIcon";
import { api } from "src/ui/api";
import { useRouter } from 'next/navigation';
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";


const useFollowAction = (isAlreadyFollowing: boolean) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const onMutationSuccess = () => {
    setIsRefreshing(true);
    router.refresh();
  }

  const { mutate: mutateFollow, isLoading: isLoadingFollow } = api.follow.useMutation({ onSuccess: onMutationSuccess });
  const { mutate: mutateUnFollow, isLoading: isLoadingUnfollow } = api.unfollow.useMutation({ onSuccess: onMutationSuccess });
  return {
    isExecuting: isLoadingFollow || isLoadingUnfollow || isRefreshing,
    execute: (userId: string) => isAlreadyFollowing ? mutateUnFollow({userToUnfollow: userId}) : mutateFollow({userToFollow: userId}),
  }
}

export const FollowButton: React.FC<{ followed: boolean; userId: string }> = ({ followed, userId }) => {
  const { isExecuting, execute } = useFollowAction(followed);
  return (
    <Button
      variant={'outline'}
      style={{ cursor: 'pointer' }}
      onClick={_ => execute(userId)}
    >{ !isExecuting ?
      <FollowButtonIcon followed={followed}/> :
      <ButtonLoaderIcon />
    }
    </Button>
  );
};

const FollowButtonIcon: React.FC<{followed: boolean}> = ({followed}) => (<> 
{ followed 
  ? <IoPersonRemoveOutline /> 
  : <IoPersonAddOutline />
}</>);