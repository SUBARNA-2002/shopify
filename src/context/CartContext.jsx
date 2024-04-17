import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      let cart = await AsyncStorage.getItem("cart");
      cart = cart == null ? [] : JSON.parse(cart);
      setCartItems(cart);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (item) => {
    try {
      let cart = await AsyncStorage.getItem("cart");
      cart = cart == null ? [] : JSON.parse(cart);

      // Check if the item is already in the cart
      const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // If the item is already in the cart, increase its quantity
        cart[existingItemIndex].qty += 1;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        item.qty = 1;
        cart.push(item);
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  const increaseQty = async (itemId) => {
    let cart = await AsyncStorage.getItem("cart");
    cart = cart == null ? [] : JSON.parse(cart);

    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex >= 0) {
      cart[itemIndex].qty += 1;
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      fetchCartItems();
    }
  };

  const decreaseQty = async (itemId) => {
    let cart = await AsyncStorage.getItem("cart");
    cart = cart == null ? [] : JSON.parse(cart);

    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex >= 0) {
      if (cart[itemIndex].qty > 1) {
        // If the quantity is more than 1, decrease it
        cart[itemIndex].qty -= 1;
      } else {
        // If the quantity is 1, remove the item from the cart
        cart.splice(itemIndex, 1);
      }
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      fetchCartItems();
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};
