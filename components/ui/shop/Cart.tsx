import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import {ShoppingCart} from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { ShoppingBag } from 'lucide-react-native';

const Cart = () => {
    const totalItem = 22; //sample
  return (
    <Box className="items-center">
      <VStack>
        <Badge
          className={`z-10 self-end  ${totalItem > 9 ? "h-[28px] w-[28px]" : "h-[22px] w-[22px]"} bg-red-600 rounded-full -mb-3.5 -mr-3.5`}
          variant="solid"
        >
          <BadgeText className=" font-bold text-white">{totalItem}</BadgeText>
        </Badge>
        <Icon className="text-typography-500" as={ShoppingBag} size="xl" />
      </VStack>
    </Box>
  );
}

export default Cart

