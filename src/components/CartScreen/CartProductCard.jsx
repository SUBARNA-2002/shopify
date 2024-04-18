import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../../context/CartContext";
import { AntDesign } from "@expo/vector-icons";
const CartProductCard = ({ item }) => {
  const { increaseQty, decreaseQty } = useContext(CartContext);

  return (
    <View className="flex-row   rounded-lg">
      <Image
        className="rounded-l-lg object-fill"
        source={{
          uri: item?.image,
        }}
        style={{ width: 100, height: 100 }}
      />
      <View className="px-3">
        <Text className="text-lg" numberOfLines={1}>
          {item?.name}
        </Text>
        <Text className="text-lg">Rs. {item?.price}</Text>
      </View>
      <View className="flex-1 justify-end items-center flex-row pr-3 gap-3">
        <TouchableOpacity onPress={() => increaseQty(item.id)}>
          <MaterialIcons name="add-circle" size={30} color="#9d32a8" />
        </TouchableOpacity>
        <View>
          <Text className="text-lg">{item?.qty}</Text>
        </View>
        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
          <AntDesign name="minuscircle" size={25} color="#9d32a8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartProductCard;
