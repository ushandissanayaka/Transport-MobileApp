import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hides tab labels
        tabBarStyle: {
          backgroundColor: "black", // Sets the tab bar background color to black
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerShown: false,
          tabBarActiveTintColor: "white", // Active tab icon color
          tabBarInactiveTintColor: "gray", // Inactive tab icon color
          // Hides header on the Home screen
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={24} color={color} />
          ),
          headerShown: false, // Hides header on the Cart screen
          tabBarActiveTintColor: "white", // Active tab icon color
          tabBarInactiveTintColor: "gray", // Inactive tab icon color
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          headerShown: false, // Hides header on the Profile screen
          tabBarActiveTintColor: "white", // Active tab icon color
          tabBarInactiveTintColor: "gray", // Inactive tab icon color
        }}
      />
    </Tabs>
  );
}
