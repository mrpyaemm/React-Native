import { Image } from "expo-image";
import React from "react";

import { Pressable } from "@/components/ui/pressable";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { CategoryType } from "./Type";


const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface CategoryProps extends CategoryType{
  select: number;
  onSelect: (id:number) => void;
};


const Category = ({id, name, image, select, onSelect}: CategoryProps) => {
  return (
    <Pressable onPress={()=> onSelect(id)}>
      <Card className="items-center gap-1">
        <Image
          style={[{ width: 56, height: 56 }, select === id && {borderColor: "orange", borderWidth: 2, borderRadius: 28}]}
          source={image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Text size="sm" bold>{name}</Text>
      </Card>
    </Pressable>
  );
};

export default Category;
