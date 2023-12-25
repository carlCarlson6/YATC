import { Button } from "@radix-ui/themes";
import React from "react";
import ButtonLoaderIcon from "src/ui/ButtonLoaderIcon";
import { IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5";
import { useFollowAction } from "./useFollowAction";

export const Follow: React.FC<{ followed: boolean; userId: string }> = ({ followed, userId }) => {
  const { isExecuting, execute } = useFollowAction(followed);
  return (
    <Button
      variant={'outline'}
      style={{ cursor: 'pointer' }}
      onClick={async _ => await execute(userId)}
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