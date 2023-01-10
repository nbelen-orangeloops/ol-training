import React, { useState, useRef } from "react";
import { View, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel, { Pagination } from "react-native-snap-carousel";
import YoutubePlayer from "react-native-youtube-iframe";

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const images = [
  "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2thdGVib2FyZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  "https://images.pexels.com/photos/58729/pexels-photo-58729.jpeg?cs=srgb&dl=pexels-salvio-bhering-58729.jpg&fm=jpg",
  "https://images.ctfassets.net/3s5io6mnxfqz/5ZHWhb7IZYugQE6g9AiAb3/82664bc995fc0694d2ab2734d841c695/AdobeStock_266317440.jpeg",
  "https://www.youtube.com/watch?v=ReAmjdNyMJA",
];

const renderItem = ({ item }: any) => {
  if (item.url.includes("youtube")) {
    const videoId = item.url.split("=")[1];
    return (
      <View
        style={{
          width: "100%",
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <YoutubePlayer height={300} play={true} videoId={videoId} />
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
  const isCarousel = useRef(null);

  const data = images.map((item: string, idx: number) => {
    return { id: idx, url: item };
  });

  return (
    <View>
      <TouchableOpacity onPress={() => setAutoPlay(!autoPlay)}>
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
        />
      </TouchableOpacity>
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
