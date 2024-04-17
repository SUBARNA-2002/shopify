import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";
export default function TopTab({ data, selected, setSelected }) {
  return (
    <View className="mx-3">
      <View className="bg-[#9d32a8] flex-row items-center justify-evenly rounded-xl p-2">
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="rounded-xl self-center flex-1 justify-center items-center"
            style={{
              backgroundColor: selected === item ? "white" : null,
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

              setSelected(item);
            }}
          >
            <Text
              className="p-2 text-lg"
              style={{
                color: selected === item ? "#9d32a8" : "white",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
