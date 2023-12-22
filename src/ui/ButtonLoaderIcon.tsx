import { Flex } from "@radix-ui/themes";
import { ClipLoader } from "react-spinners";

const ButtonLoaderIcon = () => (
  <Flex align={'center'} justify={'center'}>
    <ClipLoader
      size={10}
      color="#9EB1FF"
      speedMultiplier={0.7} />
  </Flex>
);

export default ButtonLoaderIcon;