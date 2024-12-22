import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export default function Cart() {
  const { cart } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return cart ? JSON.parse(cart as string) : [];
  });

  // Function to handle item deletion
  const deleteItem = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    // Optionally, update local storage or context with the updated cart
  };

  // Function to prevent adding duplicate items
  const addItemToCart = (newItem: CartItem) => {
    const existingItem = cartItems.find((item) => item.id === newItem.id);
    if (!existingItem) {
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
    } else {
      // Optionally show a message that the item is already in the cart
      console.log("Item is already in the cart");
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity
        onPress={() => deleteItem(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    // This effect updates the cart in local storage or context if necessary
    if (cartItems.length > 0) {
      // Update cart (use context or local storage)
      // localStorage.setItem('cart', JSON.stringify(cartItems)); // For example, in browser
    }
  }, [cartItems]);

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  cartItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
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
    color: "#2ecc71",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#999",
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
