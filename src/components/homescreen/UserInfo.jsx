import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../../context/CartContext";

const UserInfo = () => {
  const navigation = useNavigation();

  const { cartItems } = useContext(CartContext);

  return (
    <View className="bg-[#9d32a8] pt-10 rounded-b-xl flex-row justify-between items-center px-3 pb-3">
      <View className="flex-row items-center gap-2">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
          }}
          className="h-10 w-10 rounded-full"
        />
        <Text className="text-2xl text-white">Hey! Subarna👋</Text>
      </View>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => navigation.replace("cart")}
          className="bg-black/20 p-2 rounded-md"
        >
          <MaterialCommunityIcons name="cart-outline" size={24} color="white" />
          {cartItems?.length > 0 && (
            <View className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
              <Text className="text-white text-xs">{cartItems?.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <View className="bg-black/20 p-2 rounded-md">
          <MaterialIcons name="logout" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
