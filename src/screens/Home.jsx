import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import UserInfo from "../components/homescreen/UserInfo";
import TrendingProducts from "../components/homescreen/TrendingProducts";
import product from "../utils/data";
import TopTab from "../components/homescreen/TopTab";
import ProductListCard from "../components/homescreen/ProductListCard";
const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Popular");
  const tabs = ["Popular", "Offer"];
  const renderFlatList = (data) => (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 12 }}>
      <FlatList
        ListFooterComponent={() => <View style={{ height: 12 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductListCard item={item} />}
      />
    </View>
  );
  return (
    <View className="flex-1 bg-violet-50">
      <View className="flex-1">
        <UserInfo />
        <TrendingProducts data={product?.slice(0, 5)} />
        <TopTab
          data={tabs}
          selected={selectedTab}
          setSelected={setSelectedTab}
        />
        {selectedTab === "Popular" && renderFlatList(product)}
        {selectedTab === "Offer" && renderFlatList(product?.slice(5, 35))}
      </View>
    </View>
  );
};

export default Home;
