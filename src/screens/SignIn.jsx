import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import KeyboardView from "../components/KeyboardView";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const SignIn = () => {
  // const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigation();
  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please Fill all the fields!");
      return;
    }
    navigate.navigate("home");
  };

  return (
    // <KeyboardView>
    <View className="flex-1 bg-white px-3">
      <StatusBar style="dark" />
      <View className="flex-row justify-center">
        <Image
          className="h-[50vh] w-full object-contain"
          // style={{ height: 400 }}
          source={{
            uri: "https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg",
          }}
        />
      </View>
      <Text className="text-4xl text-center font-semibold tracking-widest text-[#9d32a8]">
        Sign In
      </Text>
      <View className="pt-7 pb-2">
        <TextInput
          onChangeText={(value) => (emailRef.current = value)}
          className="bg-slate-400/20 px-3 text-base rounded-md py-3"
          placeholder="Email address"
          placeholderTextColor={"gray"}
          // right={'h'}
        />
        <TextInput
          onChangeText={(value) => (passwordRef.current = value)}
          className="bg-slate-400/20 px-3 text-base rounded-md py-3 mt-3"
          placeholder="Password"
          placeholderTextColor={"gray"}
          secureTextEntry
          // right={'h'}
        />
      </View>
      <Text className="text-right font-semibold text-neutral-400">
        Forgot password ?
      </Text>
      <TouchableOpacity className="pt-7" onPress={handleLogin}>
        <Text className="text-center px-5 py-3 text-xl rounded-lg bg-[#9d32a8] text-white font-semibold">
          Sign In
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-center pt-5 gap-1">
        <Text className="font-semibold text-neutral-400">
          Dont have an account ?
        </Text>
        {/* <Pressable onPress={() => router.push("SignUp")}> */}
        <Text className="font-semibold text-[#9d32a8]">Sign Up</Text>
        {/* </Pressable> */}
      </View>
      <View className="flex-row gap-3 justify-center pt-3">
        <TouchableOpacity className="py-2 px-5 bg-[#9d32a8]/10 w-[40%]  items-center rounded">
          <AntDesign name="google" size={24} color="#9d32a8" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 px-5 bg-[#9d32a8]/10 w-[40%] items-center rounded">
          <FontAwesome5 name="facebook-f" size={24} color="#9d32a8" />
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
