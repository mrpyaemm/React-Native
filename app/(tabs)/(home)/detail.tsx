import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Icon, FavouriteIcon, StarIcon, CheckIcon } from "@/components/ui/icon";
import { Stack, useLocalSearchParams } from "expo-router";

import ViewPager from "@/components/ui/shop/ViewPager";
import { Pressable } from "@/components/ui/pressable";
import Cart from "@/components/ui/shop/Cart";
import { products } from "@/data/shop";
import { ScrollView } from "react-native";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";

import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@/components/ui/toast";

import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";

import { Button, ButtonText } from "@/components/ui/button";

const Detail = () => {
  const [more, setMore] = useState(false);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === +id);


  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const handleToast = (title: string, description: string) => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast(title, description);
    }
  };
  const showNewToast = (title: string, description: string) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId.toString(),
      placement: "top",
      duration: 2000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="success" variant="solid">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  return (
    <VStack className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: "Product Detail",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable>
              <Cart />
            </Pressable>
          ),
        }}
      />
      <ViewPager />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="mt-4 px-5" space="sm">
          <HStack className="justify-between items-center">
            <HStack space="sm" className="mt-2">
              <Text className="font-semibold text-gray-500">
                {product?.brand}
              </Text>
              <Icon as={StarIcon} color="orange" size="xs" />
              <Text size="sm">{product?.star}</Text>
              <Text size="xs" className="text-gray-500">
                ({product?.quantity})
              </Text>
            </HStack>
            <Pressable className="bg-zinc-300/40 rounded-full absolute top-2 right-2">
              <Icon
                as={FavouriteIcon}
                size="md"
                className={`h-5 w-5 ${product!.users?.length > 0 && "fill-red-400"} text-red-400`}
              />
            </Pressable>
          </HStack>
          <Text className="line-clamp-1 font-me">{product?.title}</Text>
          <HStack space="sm">
            <Text className="font-medium text-green-700">
              ${product?.price.toFixed(2)}
            </Text>
            {product?.discount! > 0 && (
              <Text size="sm" className="line-through text-gray-500">
                ${product?.discount.toFixed(2)}
              </Text>
            )}
          </HStack>
          <VStack>
            <Text numberOfLines={more ? undefined : 2}>
              {product?.description}
            </Text>
            <Pressable onPress={() => setMore((p) => !p)}>
              <Text className="font-semibold" italic>
                {more ? "See less" : "See more"}
              </Text>
            </Pressable>
          </VStack>
          <Text className="mt-2 mb-1 font-medium">Choose Color</Text>
          <CheckboxGroup
            value={color}
            onChange={(keys) => {
              setColor(keys);
            }}
          >
            <HStack space="xl">
              {product?.colors.map((item) => (
                <Checkbox
                  value={item.name}
                  key={item.id}
                  isDisabled={!item.stock}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{item.name}</CheckboxLabel>
                </Checkbox>
              ))}
            </HStack>
          </CheckboxGroup>

          <Text className="mt-2 mb-1 font-medium">Choose Color</Text>
          <CheckboxGroup
            value={size}
            onChange={(keys) => {
              setSize(keys);
            }}
          >
            <HStack space="xl">
              {product?.sizes.map((item) => (
                <Checkbox
                  value={item.name}
                  key={item.id}
                  isDisabled={!item.stock}
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{item.name}</CheckboxLabel>
                </Checkbox>
              ))}
            </HStack>
          </CheckboxGroup>

          <Button
            size="lg"
            className="bg-sky-400 self-start mt-6 rounded-r-lg"
            onPress={() => {
              if (color.length > 0 && size.length > 0) {
                setShowActionsheet(true);
                return;
              }
              const title = `Must choose ${color.length == 0 ? "color - " : ""} ${size.length == 0 ? "size - " : ""}`;
              const description = `Please set quantity just after choosing`;
              handleToast(title, description);
            }}
          >
            <ButtonText>Set Quantity</ButtonText>
          </Button>
        </VStack>
      </ScrollView>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Edit Message</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Remind Me</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem isDisabled onPress={handleClose}>
            <ActionsheetItemText>Delete</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </VStack>
  );
};

export default Detail;
