import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
// import SignIn from "../screens/SignIn";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" component={SignIn} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen
          name="cart"
          component={Cart}
          options={({ navigation }) => ({
            title: "Cart",
            headerShown: true,
            headerStyle: { backgroundColor: "#9d32a8" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.replace("home")}>
                <MaterialIcons name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
