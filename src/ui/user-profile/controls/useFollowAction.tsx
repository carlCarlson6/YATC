import { useState } from "react";
import { useRouter } from 'next/navigation';
import { followUser, unfollowUser } from "src/server/api";

export const useFollowAction = (isAlreadyFollowing: boolean) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [isLoadingUnfollow, setIsLoadingUnfollow] = useState(false);
  const router = useRouter();

  const onMutationSuccess = () => {
    setIsRefreshing(true);
    router.refresh();
    setIsRefreshing(false);
  };
  const mutateFollow = async (userId: string) => {
    setIsLoadingFollow(true);
    await followUser({userToFollow: userId});
    setIsLoadingFollow(false);
    onMutationSuccess();
  };
  const mutateUnFollow = async (userId: string) => {
    setIsLoadingUnfollow(true);
    await unfollowUser({userToUnfollow: userId});
    setIsLoadingUnfollow(false);
    onMutationSuccess();
  };

  return {
    isExecuting: isLoadingFollow || isLoadingUnfollow || isRefreshing,
    execute: async (userId: string) => isAlreadyFollowing ? await mutateUnFollow(userId) : await mutateFollow(userId),
  };
};
