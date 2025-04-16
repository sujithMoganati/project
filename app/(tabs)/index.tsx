import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "@/styles/home"; // Ensure this is correctly importing the styles
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native"; // Import Lottie
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useUser } from "@clerk/clerk-expo"; // Import Clerk's useUser hook

export default function index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { user } = useUser(); // Get user info from Clerk
  const clerkId = user?.id;

  // Fetch User Once and Cache It
  useEffect(() => {
    const fetchUser = async () => {
      if (!clerkId) return;

      try {
        // Check if the user is already cached
        const cachedUser = await AsyncStorage.getItem("shopngo_user");

        if (cachedUser) {
          console.log("✅ User fetched from cache.");
        } else {
          // If user is not cached, fetch from API
          const res = await fetch(
            `https://shopngo-backend.onrender.com/user/${clerkId}`
          );
          const data = await res.json();

          if (res.ok) {
            // Save user data in cache
            await AsyncStorage.setItem("shopngo_user", JSON.stringify(data));
            console.log("✅ User saved to cache.");
          }
        }
      } catch (error) {
        console.error("Error fetching or caching user:", error);
      }
    };

    fetchUser();
  }, [clerkId]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://shopngo-backend.onrender.com/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sections = {
    "Best Seller": [],
    "Newly Arrived": [],
    "Popular Picks": [],
    "Top Rated": [],
    "On Sale": [],
  };

  filteredProducts.forEach((p, i) => {
    const keys = Object.keys(sections);
    const section = keys[i % keys.length];
    sections[section].push(p);
  });

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/categories/${item._id}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.priceAndWeightContainer}>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          {item.weight && (
            <Text style={styles.productWeight}>{item.weight}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/title.png")}
            style={styles.logo}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image
            source={require("@/assets/images/search.png")}
            style={styles.searchIcon}
          />
          <View style={styles.verticalBar} />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Product Sections */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fcbf49"
            style={{ marginTop: 30 }}
          />
        ) : (
          <View>
            {filteredProducts.length === 0 ? (
              <View style={{ alignItems: "center" }}>
                {/* Beautiful Lottie Animation for "Item not found" */}
                <LottieView
                  source={require("@/assets/animations/item-not-found.json")}
                  autoPlay
                  loop
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyText}>
                  Oops, your searched item was not found.
                </Text>
                <Text style={styles.subText}>
                  Find something awesome to buy!
                </Text>
              </View>
            ) : (
              Object.entries(sections).map(([title, items]) => (
                <View key={title} style={{ marginBottom: 30 }}>
                  <Text style={styles.categoryTitle}>{title}</Text>
                  <FlatList
                    data={items}
                    keyExtractor={(item) => item._id}
                    renderItem={renderProduct}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                  />
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
