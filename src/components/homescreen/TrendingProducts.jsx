import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel"; // import the Carousel and Pagination components

const TrendingProducts = ({ data }) => {
  // Dummy data for the Carousel
//   console.log("first data", data);
  const entries = ["Product 1", "Product 2", "Product 3"];

  // State to hold the index of the active slide
  const [activeSlide, setActiveSlide] = useState(0);

  // Function to render each item of the Carousel
  const renderItem = ({ item, index }) => {
    return (
      <View className="bg-white  rounded-md">
        <Image
          src={item.image}
          alt="..."
          className="w-full h-48 object-fill rounded-md"
        />
        <Text className="text-lg px-1 py-2 rounded-b-md bg-white">
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text className="text-lg pb-3 uppercase text-left px-5 pt-3">
        Trending Products
      </Text>
      <Carousel
        layout="default"
        autoplay={true}
        loop={true}
        autoplayInterval={3000}
        data={data}
        renderItem={renderItem}
        sliderWidth={390} // change this as per your requirement
        itemWidth={356} // change this as per your requirement
        onSnapToItem={(index) => setActiveSlide(index)} // update the active slide state when a new slide comes into view
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "transparent", paddingTop: 8 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 2,
          backgroundColor: "#9d32a8",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default TrendingProducts;
