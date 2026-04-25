import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

type TitleProp = {
    title : string;
    actionText : string;
}

const Title = ({title, actionText}: TitleProp) => {
  return (
    <HStack className="justify-between">
        <Text size="lg" className="font-medium text-black">{title}</Text>
        <Pressable>
            <Text className="text-gray">{actionText}</Text>
        </Pressable>
    </HStack>
  )
}

export default Title