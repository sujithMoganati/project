import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetails() {
  const { productId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Product Details",
      headerStyle: {
        backgroundColor: "#fce3b1",
      },
      headerTintColor: COLORS.infodark,
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        width: "100%",
      },
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/categories")}
          style={{ paddingHorizontal: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.infodark} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (productId) {
      fetch(`https://shopngo-backend.onrender.com/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    const checkCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        const cart = cartData ? JSON.parse(cartData) : [];
        const exists = cart.some((item) => item._id === productId);
        setIsInCart(exists);
      } catch (err) {
        console.error("Error checking cart:", err);
      }
    };

    checkCart();
  }, [productId]);

  const addToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      const cart = cartData ? JSON.parse(cartData) : [];

      const productIndex = cart.findIndex((item) => item._id === product._id);
      if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      setIsInCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load product details: {error}. Please try again later.
        </Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {product.price && (
        <View style={styles.priceContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {product.originalPrice && (
                <Text style={styles.priceLabel}>₹{product.originalPrice}</Text>
              )}
              <Text style={styles.discountedPrice}>₹{product.price}</Text>
            </View>
            {product.weight && (
              <Text style={[styles.productWeight, { marginLeft: "auto" }]}>
                {product.weight}
              </Text>
            )}
          </View>
        </View>
      )}

      {isInCart ? (
        <View
          style={[styles.addToCartButton, { backgroundColor: COLORS.info }]}
        >
          <Text style={[styles.addToCartButtonText, { color: "#fff" }]}>
            Product Added to Cart
          </Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}

      {/* Store Info Section */}
      <View style={styles.storeInfoSection}>
        <Text style={styles.storeHeading}>About Our Store</Text>
        <Image
          source={require("@/assets/images/store.png")}
          style={styles.storeImage}
        />
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={22} color="#d84315" />
          <Text style={styles.storeAddressText}>
            Issac Newton Block, Andhra University, Visakhapatnam, 530003
          </Text>
        </View>
        <Text style={styles.shopDescriptionTitle}>Why Choose Us?</Text>
        <Text style={styles.shopDescription}>
          Our store offers a premium selection of daily essentials with quality
          and care. Located at the heart of AU Campus, we aim to provide
          convenience, trust, and affordability to students and locals alike.
        </Text>
      </View>
    </ScrollView>
  );
}
