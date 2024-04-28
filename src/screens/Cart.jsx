import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartContext } from "../context/CartContext";
import CartProductCard from "../components/CartScreen/CartProductCard";
import "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RazorpayCheckout from "react-native-razorpay";

const Cart = () => {
  const address = [
    {
      id: 1,
      name: "Home",
      address: "Kailash Vihar,Bhubaneswar,Odisha,India,751024",
    },
    {
      id: 2,
      name: "Work",
      address: "Cyber City,Gurugram,Haryana,India,122002",
    },
    {
      id: 3,
      name: "Other",
      address: "Kailash Vihar,Bhubaneswar,Odisha,India,751024",
    },
  ];
  const [selectedAddress, setSelectedAddress] = useState(null);

  // console.log("address", address);
  const { cartItems } = useContext(CartContext);
  const totalValue = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const SubTotal = totalValue + 100 - 100;

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [1, 400], []);

  // callbacks
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    bottomSheetRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useEffect(() => {
    const loadAddress = async () => {
      const storedAddress = await AsyncStorage.getItem("selectedAddress");
      if (storedAddress) {
        setSelectedAddress(JSON.parse(storedAddress));
      } else {
        setSelectedAddress(address[0]); // Default address if none is stored
      }
    };

    loadAddress();
  }, []);

  const handleAddressSelect = async (item) => {
    handleClosePress();
    setSelectedAddress(item);
    await AsyncStorage.setItem("selectedAddress", JSON.stringify(item));
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-violet-50 pt-3 px-3">
        <View className="flex-1">
          {cartItems?.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Image
                source={{
                  uri: "https://cdni.iconscout.com/illustration/premium/thumb/girl-sitting-in-empty-cart-9663087-7898364.png?f=webp",
                }}
                style={{ height: 200, width: 200 }}
              />
              <Text className="text-2xl text-center">Cart is Empty</Text>
            </View>
          ) : (
            <FlatList
              ListFooterComponent={() => <View style={{ height: 12 }} />}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              showsVerticalScrollIndicator={false}
              data={cartItems}
              keyExtractor={(item) => item?.id}
              renderItem={({ item }) => <CartProductCard item={item} />}
            />
          )}
        </View>
        <View className=" rounded-md  flex-row justify-between p-2 items-center bg-red-100 border border-[#9d32a8]  py-2">
          <View>
            <Text className="text-base">Address</Text>
            <Text className="text-base" numberOfLines={2}>
              <Text className="text-base" numberOfLines={2}>
                {selectedAddress?.address || "No address selected"}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            className="bg-[#9d32a8] inline-block  rounded-lg "
            onPress={handleExpandPress}
          >
            <Text className="text-base px-2 text-white py-2">Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className=" bg-violet-50 rounded-lg pt-3">
        <View className="py-3 bg-red-100 rounded-lg">
          <View className="flex-row justify-between p-2 items-center">
            <Text className="text-base">Total ({cartItems?.length})</Text>
            <Text className="text-base">Rs. {totalValue}</Text>
          </View>
          <View className="flex-row justify-between p-2 items-center ">
            <Text className="text-base">Delivery Charge</Text>
            <Text className="text-base">Rs. 100</Text>
          </View>
          <View className="flex-row justify-between p-2 items-center ">
            <Text className="text-base">Discount</Text>
            <Text className="text-base">Rs. 100</Text>
          </View>
          <View className="flex-row justify-between p-2 items-center ">
            <Text className="text-base">SubTotal</Text>
            <Text className="text-base">Rs. {SubTotal}</Text>
          </View>
          <TouchableOpacity
            className="bg-[#9d32a8] inline-block  rounded-lg mt-3 mx-3"
            onPress={() => {
              var options = {
                description: "Credits towards consultation",
                image: "https://i.imgur.com/3g7nmJC.jpg",
                currency: "INR",
                key: "rzp_test_FcAg5OyR96FxNd	",
                amount: "5000",
                name: "Acme Corp",
                order_id: "", //Replace this with an order_id created using Orders API.
                prefill: {
                  email: "gaurav.kumar@example.com",
                  contact: "9191919191",
                  name: "Gaurav Kumar",
                },
                theme: { color: "#9d32a8" },
              };
              RazorpayCheckout.open(options)
                .then((data) => {
                  // handle success
                  alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch((error) => {
                  // handle failure
                  alert(`Error: ${error.code} | ${error.description}`);
                });
            }}
          >
            <Text className="text-base text-center  text-white py-3">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button title="Snap To 450" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 150" onPress={() => handleSnapPress(0)} />
      <Button title="Expand" onPress={handleExpandPress} />
      <Button title="Collapse" onPress={handleCollapsePress} />
      <Button title="Close" onPress={handleClosePress} /> */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animateOnMount={true}
      >
        {address?.map((item) => (
          <View className=" rounded-md  flex-row justify-between p-2 items-center bg-red-100 border border-[#9d32a8] m-1  py-2">
            <View>
              <Text className="text-base">{item?.name}</Text>
              <Text className="text-base" numberOfLines={2}>
                {item?.address}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-[#9d32a8] inline-block  rounded-lg "
              onPress={() => {
                handleClosePress();
                handleAddressSelect(item);
              }} // Update the selected address when this button is pressed
            >
              <Text className="text-base px-2 text-white py-2">Choose</Text>
            </TouchableOpacity>
          </View>
        ))}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Cart;
