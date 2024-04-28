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
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import KeyboardView from "../components/KeyboardView";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useState("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign In", "Please Fill all the fields!");
      return;
    }
  };

  return (
    <KeyboardView>
      <View className="flex-1 px-3">
        <StatusBar style="dark" />
        <View className="flex-row justify-center">
          <Image
            className="h-[50vh] w-full object-contain"
            // style={{ height: 400 }}
            source={{
              uri: "https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg",
            }}
          />
        </View>
        <Text className="text-4xl text-center font-semibold tracking-widest">
          Sign Up
        </Text>
        <View className="py-7">
          <TextInput
            onChangeText={(value) => (nameRef.current = value)}
            className="bg-slate-400/20 px-3 text-2xl rounded-md py-4"
            placeholder="Name"
            placeholderTextColor={"gray"}
            // right={'h'}
          />
          <TextInput
            onChangeText={(value) => (emailRef.current = value)}
            className="bg-slate-400/20 px-3 text-2xl rounded-md py-4 mt-3"
            placeholder="Emain address"
            placeholderTextColor={"gray"}
            // right={'h'}
          />
          <TextInput
            onChangeText={(value) => (passwordRef.current = value)}
            className="bg-slate-400/20 px-3 text-2xl rounded-md py-4 mt-3"
            placeholder="Password"
            placeholderTextColor={"gray"}
            secureTextEntry
            // right={'h'}
          />
        </View>
        {/* <Text className="text-right font-semibold text-neutral-400">
        Forgot password ?
      </Text> */}
        <TouchableOpacity className="pt-7" onPress={handleRegister}>
          <Text className="text-center px-5 py-5 text-2xl rounded-lg bg-indigo-500 text-white font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center pt-5 gap-1">
          <Text className="font-semibold text-neutral-400">
            Already have an account ?
          </Text>
          <Pressable onPress={() => router.push("SignIn")}>
            <Text className="font-semibold text-indigo-500">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
