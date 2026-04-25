import { useRouter } from "expo-router";
import React from "react";
import { Image } from "expo-image";
import { ProductType } from "./Type";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Pressable } from "@/components/ui/pressable";
import { Card } from "@/components/ui/card";
import { Icon, FavouriteIcon, StarIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { colors } from "@/data/shop";

interface ProductProps extends ProductType {}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Product = ({
  id,
  brand,
  title,
  star,
  quantity,
  price,
  discount,
  image,
  users,
}: ProductProps) => {
  const router = useRouter();
  return (
    <Pressable className="mx-2 mb-4" onPress={()=> router.navigate({pathname:"/detail", params:{id}})}>
      <Card className="bg-white p-0">
        <Image
          style={{ width: "100%", aspectRatio: 3 / 4, borderRadius: 5 }}
          source={image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Pressable className="bg-zinc-300/40 rounded-full absolute top-2 right-2">
          <Icon
            as={FavouriteIcon}
            size="md"
            className={`m-2 h-5 w-5 ${users.length > 0 && "fill-red-400"} text-red-400`}
          />
        </Pressable>

        <VStack className="mt-2 " space="xs">
          <HStack space="sm" className="mt-2">
            <Text className="font-semibold text-gray-500">{brand}</Text>
            <Icon as={StarIcon} color="orange" size="xs" />
            <Text size="sm">{star}</Text>
            <Text size="xs" className="text-gray-500">
              ({quantity})
            </Text>
          </HStack>
          <Text numberOfLines={1}>{title}</Text>
          <HStack space="sm">
            <Text className="font-medium text-green-700">
              ${price.toFixed(2)}
            </Text>
            {discount > 0 && (
              <Text size="sm" className="line-through text-gray-500">
                ${discount.toFixed(2)}
              </Text>
            )}
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
};

export default Product;
