import { useState } from "react";
import { useRouter } from 'next/navigation';
import { followrUserAction } from "src/server/user/follows/follow/api";
import { unFollowUserAction } from "src/server/user/follows/unfollow/api";

export const useFollowAction = (isAlreadyFollowing: boolean) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [isLoadingUnfollow, setIsLoadingUnfollow] = useState(false);
  const router = useRouter();
  const onMutationSuccess = () => {
    setIsRefreshing(true);
    router.refresh();
  };

  const mutateFollow = async (userId: string) => {
    setIsLoadingFollow(true);
    await followrUserAction({userToFollow: userId});
    setIsLoadingFollow(false);
    onMutationSuccess();
  };

  const mutateUnFollow = async (userId: string) => {
    setIsLoadingUnfollow(true);
    await unFollowUserAction({userToUnfollow: userId});
    setIsLoadingUnfollow(false);
    onMutationSuccess();
  };

  //const { mutate: mutateFollow, isLoading: isLoadingFollow } = api.follow.useMutation({ onSuccess: onMutationSuccess });
  //const { mutate: mutateUnFollow, isLoading: isLoadingUnfollow } = api.unfollow.useMutation({ onSuccess: onMutationSuccess });
  return {
    isExecuting: isLoadingFollow || isLoadingUnfollow || isRefreshing,
    execute: async (userId: string) => isAlreadyFollowing ? await mutateUnFollow(userId) : await mutateFollow(userId),
  };
};
