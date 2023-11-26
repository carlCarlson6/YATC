import { Button } from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';

export const RealoadButton = () => {
  const router = useRouter();
  return (
    <Button 
      variant={'outline'} 
      style={{ cursor: 'pointer' }} 
      onClick={_ => router.refresh()}
    >
      <ReloadIcon />
    </Button>
  );
};
