import {useState, useCallback} from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, Text, ScrollView, Dimensions } from "react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Image } from "expo-image";
import Cart from "@/components/ui/shop/Cart";
import Title from "@/components/ui/shop/Title";
import {FlashList} from "@shopify/flash-list"
import { categories, products } from "@/data/shop/index";
import Category from "@/components/ui/shop/Category";
import Product from "@/components/ui/shop/Product";





import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { Move, MoveUpRight } from "lucide-react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  

  const [select, setSelect] = useState(1);

  const selectHandler = useCallback((id: number) =>{
    setSelect(id);
  },[]);

  const width = Dimensions.get("screen").width; //Responsive
  const numColumns = width < 600 ? 2 : width < 768 ? 3 : 4;
  const itemWidth = width / numColumns -30;

  return (
    <SafeAreaProvider className="flex-1 bg-white ">
      <HStack className="justify-between px-5 my-2 items-center">
        <Pressable>
          <Image
            style={{ width: 56, height: 28 }}
            source={require("@/assets/images/n.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>

        <Pressable>
          <Cart />
        </Pressable>
      </HStack>
      <ScrollView>
        <Image
          style={{ width: "100%", aspectRatio: 20 / 9 }}
          source={require("@/data/shop/banner6.png")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <VStack className="px-5 mt-4">
          <Title title="Shop By Category" actionText="See All" />
          <FlashList
            data={categories}
            renderItem={({ item }) => (
              <Category {...item} select={select} onSelect={selectHandler} />
            )}
            keyExtractor={(item) => item.id.toString()} //need String
            horizontal
            extraData={select} //solve cache issue
            showsHorizontalScrollIndicator={false}
          />

          <Title title="Recommended for You" actionText="See All" />
          <FlashList
            data={products}
            renderItem={({ item }) => <Product {...item} />}
            numColumns={numColumns}
            keyExtractor={(item) => item.id.toString()} //need String
            showsVerticalScrollIndicator={false}
            
            ListFooterComponent={() => (
              <Button className="mx-auto bg-green-400 rounded-lg">
                <ButtonText className="font-bold" size="lg">
                  Explore More
                </ButtonText>
                <ButtonIcon
                  as={MoveUpRight}
                  className="h-5 w-5 ml-1"
                />
              </Button>
            )}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        </VStack>
      </ScrollView>
    </SafeAreaProvider>
  );
}

