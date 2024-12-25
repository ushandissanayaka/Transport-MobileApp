import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Vehicle = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export default function Home() {
  const router = useRouter();
  const { username } = useLocalSearchParams(); // Get the username from route params
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [cart, setCart] = useState<Vehicle[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setVehicles(data.products))
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        Alert.alert(
          "Error",
          "Failed to load products. Please try again later.",
        );
      });
  }, []);

  const handleAddToCart = (item: Vehicle) => {
    setCart((prevCart) => [...prevCart, item]);
    Alert.alert("Success", `${item.title} added to the cart.`);
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const renderItem = ({ item }: { item: Vehicle }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={styles.addToCartButton}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#ff4444" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, {username ? username : "Guest"} 👋
        </Text>
      </View>

      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {
          router.push({
            pathname: "/cart",
            params: { cart: JSON.stringify(cart) },
          });
        }}
      >
        <Ionicons name="cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>Cart: {cart.length}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    padding: 16,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2ecc71",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  favoriteButton: {
    padding: 8,
  },
  cartButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#3498db",
    borderRadius: 30,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cartButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
});
