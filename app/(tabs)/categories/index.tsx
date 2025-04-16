import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "@/constants/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "@/styles/categories";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  weight?: string;
  description?: string;
  oldPrice?: number;
  images?: string;
}

export default function CategoriesScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("https://shopngo-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const groupByCategory = () => {
    const grouped: Record<string, Product[]> = {};
    products.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={
        () => router.push(`/categories/${item._id}`) // Correct path to navigate
      }
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

  const groupedData = groupByCategory();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Categories",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fce3b1" },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontFamily: "Arial",
            fontSize: 30,
            fontWeight: "bold",
            color: COLORS.info,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <FontAwesome6
                name="arrow-left-long"
                size={24}
                color={COLORS.infodark}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#fce3b1" barStyle="dark-content" />

          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text style={styles.errorText}>
              Failed to load products. Please try again later.
            </Text>
          ) : (
            <FlatList
              data={Object.entries(groupedData)}
              keyExtractor={([category]) => category}
              renderItem={({ item: [category, items] }) => (
                <View key={category} style={{ marginBottom: 24 }}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <FlatList
                    data={items}
                    horizontal
                    keyExtractor={(item) => item._id}
                    renderItem={renderProduct}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                  />
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 50 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
