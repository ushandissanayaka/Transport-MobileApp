import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

type CartItem = {
  id: number;
  make: string;
  model: string;
  price: number;
};

export default function Cart() {
  const { cart } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    cart ? JSON.parse(cart as string) : [],
  );

  const deleteItem = (itemId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            const updatedCart = cartItems.filter((item) => item.id !== itemId);
            setCartItems(updatedCart);
          },
        },
      ],
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemTitle}>
        {item.make} {item.model}
      </Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity
        onPress={() => deleteItem(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/cart.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Your Cart</Text>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.emptyMessage}>Your cart is empty.</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay to make the background darker
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#FFD700", // Yellow color for "Your Cart" text
  },
  listContainer: {
    paddingBottom: 16,
  },
  cartItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(249, 249, 249, 0.8)", // Transparent background for the card
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: "black",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e74c3c",
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
