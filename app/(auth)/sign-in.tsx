import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername && storedUsername === username) {
        Alert.alert("Success", `Welcome back, ${username}!`);
        router.replace({
          pathname: "/home",
          params: { username },
        });
      } else {
        Alert.alert("Error", "Invalid username. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong during sign-in.");
      console.error("Sign-in error:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/pic5.png")} // Adjust this path to your image location
      style={{ flex: 1 }}
      resizeMode="cover" // Ensure the image covers the entire background
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#EAB308", // yellow-500
          }}
        >
          Sign In
        </Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 16,
            borderColor: "gray",
            color: "#EAB308", // yellow-500
            backgroundColor: "#2c2c2c",
          }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 16,
            borderColor: "gray",
            color: "#EAB308", // yellow-500
            backgroundColor: "#2c2c2c",
          }}
        />
        <TouchableOpacity
          onPress={handleSignIn}
          style={{
            backgroundColor: "#EAB308", // yellow-500
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.replace("/sign-up")}
          style={{ marginTop: 16, alignItems: "center" }}
        >
          <Text style={{ color: "#EAB308" }}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
