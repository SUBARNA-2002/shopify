import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../../context/CartContext";

const ProductListCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <View className="flex-row bg-white shadow-lg rounded-lg">
      <Image
        className="rounded-l-lg object-fill"
        source={{
          uri: item.image,
        }}
        style={{ width: 100, height: 100 }}
      />
      <View className="px-3">
        <Text className="text-lg" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-lg">Rs.{item.price}</Text>
      </View>
      <View className="flex-1 justify-end items-center flex-row pr-3">
        <TouchableOpacity onPress={() => addToCart(item)}>
          <MaterialIcons name="add-circle" size={30} color="#9d32a8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductListCard;
