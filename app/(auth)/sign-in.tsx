import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required!");
      return;
    }
    router.replace({
      pathname: "/home",
      params: { username: " Ushan pramod" },
    });
  };

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border rounded-lg p-3 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border rounded-lg p-3 mb-4"
      />
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-blue-500 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="mt-4"
      >
        <Text className="text-blue-500 text-center">
          Already have not an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
