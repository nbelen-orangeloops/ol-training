import React, { useState, useRef } from "react";
import { View, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel, { Pagination } from "react-native-snap-carousel";
import WebView from "react-native-webview";

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const images = [
  {
    category: "img",
    url: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2thdGVib2FyZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    category: "img",
    url: "https://images.pexels.com/photos/58729/pexels-photo-58729.jpeg?cs=srgb&dl=pexels-salvio-bhering-58729.jpg&fm=jpg",
  },
  {
    category: "img",
    url: "https://images.ctfassets.net/3s5io6mnxfqz/5ZHWhb7IZYugQE6g9AiAb3/82664bc995fc0694d2ab2734d841c695/AdobeStock_266317440.jpeg",
  },
  { category: "video", url: "https://www.youtube.com/watch?v=ReAmjdNyMJA" },
];

const renderItem = ({ item }: any) => {
  if (item.category === "video") {
    const newUrl = item.url.replace("watch?v=", "embed/");
    return (
      <View
        style={{
          width: "100%",
          height: 300,
          borderRadius: 20,
        }}
      >
        <WebView
          source={{ uri: newUrl }}
          style={{ width: 400, height: 300 }}
          mediaPlaybackRequiresUserAction={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          automaticallyAdjustContentInsets={false}
          mixedContentMode="always"
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: "100%",
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.url }}
          style={{ width: "100%", height: 300 }}
        />
      </View>
    );
  }
};

export const CarouselComp = () => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  // const [stopAutoPlay, setStopAutoPlay] = useState(false);
  const isCarousel = useRef(null);

  const data = images.map((item, idx: number) => {
    return { ...item, id: idx };
  });

  return (
    <View style={{ width: "100%" }}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        layout="default"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index: number) => setIndex(index)}
        loop={true}
        autoplay={autoPlay}
        autoplayInterval={3000}
        lockScrollWhileSnapping={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
          marginHorizontal: 8,
          backgroundColor: "#FC8C27",
        }}
      />
    </View>
  );
};
