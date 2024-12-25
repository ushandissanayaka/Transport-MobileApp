import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    try {
      await AsyncStorage.setItem("username", username); // Store username locally
      Alert.alert("Success", "Account created successfully!");
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to save user data. Please try again.");
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
        Sign Up
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
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          backgroundColor: "#3498db",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/sign-in")}
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#3498db" }}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
