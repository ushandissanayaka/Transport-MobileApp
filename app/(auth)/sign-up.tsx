import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    Alert.alert("Success", "Account created successfully!");
    router.replace({
      pathname: "/(auth)/sign-in",
      params: { username },
    });
  };

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Sign Up</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="border rounded-lg p-3 mb-4"
      />
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
        onPress={handleSignUp}
        className="bg-blue-500 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-in")}
        className="mt-4"
      >
        <Text className="text-blue-500 text-center">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
