import { Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const SearchUsersButton = () => (
  <Button variant={'outline'} style={{ cursor: 'pointer' }}>
    <MagnifyingGlassIcon />
  </Button>
);
