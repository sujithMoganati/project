import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location"; // Import expo-location

export default function Orders() {
  const { newOrder } = useLocalSearchParams();
  const [showAnimation, setShowAnimation] = useState(newOrder === "true");
  const [order, setOrder] = useState<any>(null);
  const [previousOrder, setPreviousOrder] = useState<any>(null); // State for previous order
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null); // State for storing user location

  const fetchLatestOrder = async () => {
    try {
      const userData = await AsyncStorage.getItem("shopngo_user"); // Change from "userDetails" to "shopngo_user"
      const user = userData ? JSON.parse(userData) : null;
      if (!user?.number) return;

      const response = await fetch(
        `https://shopngo-backend.onrender.com/orders/user/${user.number}`
      );
      const data = await response.json();

      console.log("Fetched orders:", data); // Debug

      if (Array.isArray(data) && data.length > 0) {
        setOrder(data[data.length - 1]); // Set the latest order
        if (data.length > 1) {
          setPreviousOrder(data[data.length - 2]); // Set the previous order if available
        }
      }
    } catch (err) {
      console.error("Failed to fetch order:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to get current location
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (coords) {
        console.log("User's Location:", coords); // Log to verify the location
        setUserLocation(coords);
      }
    } catch (err) {
      console.error("Error fetching location:", err);
      Alert.alert("Error", "Unable to fetch your location.");
    }
  };

  useEffect(() => {
    if (showAnimation) {
      const timeout = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      fetchLatestOrder();
      getCurrentLocation(); // Fetch user location when the component loads
    }
  }, [showAnimation]);

  if (showAnimation) {
    return (
      <View style={styles.centered}>
        <LottieView
          source={require("@/assets/animations/success.json")}
          autoPlay
          loop={false}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.successText}>Order Placed Successfully!</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f57c00" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No recent orders found.</Text>
      </View>
    );
  }

  // Combined data for FlatList
  const data = [
    {
      type: "current",
      order: order,
    },
    {
      type: "previous",
      order: previousOrder,
    },
  ];

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        if (item.type === "current") {
          return (
            <View>
              <Text style={styles.heading}>Order Summary</Text>

              <MapView
                style={styles.map}
                region={
                  userLocation
                    ? {
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                        latitudeDelta: 0.002, // Adjusted for 300m zoom
                        longitudeDelta: 0.002,
                      }
                    : {
                        latitude: 28.6139, // Default location (Delhi)
                        longitude: 77.209,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                      }
                }
              >
                {userLocation && (
                  <Marker
                    coordinate={{
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                    }}
                    title="Your Location"
                  />
                )}
                <Marker
                  coordinate={{
                    latitude: 28.6139, // Replace with order delivery address latitude
                    longitude: 77.209, // Replace with order delivery address longitude
                  }}
                  title="Delivery Location"
                />
              </MapView>

              <View style={styles.card}>
                <FlatList
                  data={order.products}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                      <Text style={styles.itemName}>{item.productId.name}</Text>
                      <Text style={styles.itemQty}>x{item.quantity}</Text>
                      <Text style={styles.itemPrice}>₹{item.price}</Text>
                    </View>
                  )}
                />

                <View style={styles.divider} />
                <Text style={styles.totalText}>
                  Total: ₹{order.totalAmount.$numberDecimal}
                </Text>
                <Text style={styles.status}>Status: {order.status}</Text>
                <Text style={styles.payment}>Paid via Razorpay</Text>
              </View>
            </View>
          );
        }

        if (item.type === "previous" && previousOrder) {
          return (
            <View style={styles.card}>
              <Text style={styles.heading}>Previous Order</Text>
              <FlatList
                data={previousOrder.products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.productId.name}</Text>
                    <Text style={styles.itemQty}>x{item.quantity}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                  </View>
                )}
              />

              <View style={styles.divider} />
              <Text style={styles.totalText}>
                Total: ₹{previousOrder.totalAmount.$numberDecimal}
              </Text>
              <Text style={styles.status}>Status: {previousOrder.status}</Text>
              <Text style={styles.payment}>Paid via Razorpay</Text>
            </View>
          );
        }

        return null; // If there's no order data, return nothing
      }}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  successText: {
    fontSize: 20,
    marginTop: 20,
    color: "#00C851",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#fff3e0",
    color: "#f57c00",
  },
  map: {
    height: 350,
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemQty: {
    fontSize: 16,
    width: 40,
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 16,
    width: 60,
    textAlign: "right",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#4caf50",
  },
  status: {
    fontSize: 16,
    color: "#ff9800",
    marginTop: 6,
  },
  payment: {
    fontSize: 14,
    color: "#888",
  },
  emptyText: {
    fontSize: 16,
    color: "#aaa",
  },
});
