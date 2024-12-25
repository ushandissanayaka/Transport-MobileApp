import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      // Retrieve the stored username
      const storedUsername = await AsyncStorage.getItem("username");

      if (storedUsername && storedUsername === username) {
        Alert.alert("Success", `Welcome back, ${username}!`);

        // Navigate to the Home page without passing the email
        router.replace({
          pathname: "/home", // Ensure "/home" matches the Home page route in your app
          params: { username }, // Pass only the username as a parameter
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Sign In
      </Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      />
      <TouchableOpacity
        onPress={handleSignIn}
        style={{
          backgroundColor: "#3498db",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/sign-up")} // Navigate to the sign-up page
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#3498db" }}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
