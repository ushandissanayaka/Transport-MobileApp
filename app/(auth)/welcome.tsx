import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants"; // Ensure this path is correct

const Onboarding = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle "Next" button click
  const handleNext = () => {
    if (swiperRef.current && activeIndex < onboarding.length - 1) {
      // @ts-ignore
      swiperRef.current.scrollBy(1);
    } else {
      router.replace("/(auth)/sign-up"); // Navigate to sign-up on the last page
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-white">
      {/* Header */}
      <View className="w-full items-center mt-20 py-4">
        <Text className="text-4xl font-JakartaBold text-blue-500">
          AutoScope
        </Text>
      </View>

      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="absolute top-10 right-5"
      >
        <Text className="text-blue-500 text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper Component */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center justify-center">
            {item.image && (
              <Image
                source={item.image} // Dynamically load the image for each page
                className="w-96 h-96 mb-4" // Increased size (width and height set to 96)
                resizeMode="contain"
              />
            )}
            <Text className="text-2xl font-JakartaBold mb-2">{item.title}</Text>
            <Text className="text-md text-gray-500 text-center px-5">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        className="absolute bottom-10 bg-blue-500 py-3 w-full px-8 rounded-full"
      >
        <Text className="text-white text-lg font-JakartaBold text-center">
          {activeIndex === onboarding.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
