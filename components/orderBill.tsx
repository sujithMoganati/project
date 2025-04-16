import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location"; // Import expo-location
import styles from "@/styles/orderbill-styles";

// Add a function to fetch the current address using reverse geocoding
const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    const address = data.results[0]?.formatted;
    return address || "Address not found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Address not found";
  }
};

export default function OrderBill({
  visible,
  onClose,
  cartItems,
  selectedAddress,
  totalPrice,
}: {
  visible: boolean;
  onClose: () => void;
  cartItems: any[];
  totalPrice: number;
}) {
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string>("");

  const deliveryCharge = 18;
  const gst = +(totalPrice * 0.009).toFixed(2);
  const grandTotal = totalPrice + deliveryCharge + gst;

  useEffect(() => {
    // Request location permissions and fetch user's location
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Please enable location permissions."
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = location.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        setUserAddress(address); // Set the address for the order
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Unable to fetch your location.");
      }
    };

    getLocation();
  }, []);

  const handlePay = async () => {
    const userData = await AsyncStorage.getItem("shopngo_user");
    const user = await JSON.parse(userData);
    try {
      const res = await fetch(
        "https://shopngo-backend.onrender.com/orders/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            number: user.number,
            products: cartItems.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
              price: item.price,
            })),
            totalAmount: totalPrice,
            method: "razorpay",
            deliveryAddress: userAddress || "123 Demo Street", // Use user address if available
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      if (res.ok) {
        await AsyncStorage.removeItem("cart");

        const updatedUser = {
          ...user,
          lastOrder: {
            products: cartItems,
            totalAmount: totalPrice,
            orderId: data.razorpayOrder.id,
          },
        };
        await AsyncStorage.setItem("shopngo_user", JSON.stringify(updatedUser));

        const { razorpayOrder } = data;

        router.push({
          pathname: "/cart/OrderPayment",
          params: {
            orderId: razorpayOrder.id,
            amount: totalPrice * 100,
            name: user.name || "",
            email: user.email || "",
            phone: user.number || "",
          },
        });
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      Alert.alert("Checkout Failed", err.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>🧾 Order Summary</Text>

          <FlatList
            data={cartItems}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No items in cart.
              </Text>
            }
          />

          <View style={styles.summary}>
            <Text>Total: ₹{totalPrice.toLocaleString()}</Text>
            <Text>Delivery: ₹{deliveryCharge}</Text>
            <Text>GST (0.9%): ₹{gst}</Text>
            <Text style={styles.grandTotal}>
              Payable: ₹{grandTotal.toLocaleString()}
            </Text>
            {userAddress && (
              <Text style={styles.addressText}>
                Delivery Address: {selectedAddress?.city || ""},
                {selectedAddress?.state || ""}
              </Text>
            )}
          </View>

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handlePay} style={styles.payButton}>
              <Text style={styles.payText}>Pay Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
