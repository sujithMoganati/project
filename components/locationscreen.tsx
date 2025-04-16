// components/LocationScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { COLORS } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Address {
  city?: string;
  region?: string;
  postalCode?: string;
  street?: string;
}

const LocationScreen: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCachedAddress = async () => {
      try {
        const cached = await AsyncStorage.getItem("cacheAddress");
        if (cached) {
          setAddress(JSON.parse(cached));
        }
      } catch (error) {
        console.error("🚨 Error loading cached address:", error);
      }
    };

    loadCachedAddress();
  }, []);

  useEffect(() => {
    if (!address && !loading) {
      getUserAddress();
    }
  }, [address, loading]);

  const getUserAddress = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("❌ Location permission denied");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const addressData = await Location.reverseGeocodeAsync(location.coords);

      if (addressData.length > 0) {
        const fetched = addressData[0];
        const simplified: Address = {
          city: fetched.city || "",
          region: fetched.region || "",
          postalCode: fetched.postalCode || "",
          street: fetched.street || "",
        };
        setAddress(simplified);
        await AsyncStorage.setItem("cacheAddress", JSON.stringify(simplified));
      }
    } catch (err) {
      console.error("🚨 Error fetching address:", err);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <Text style={styles.locationText}>
          {address
            ? `${address.city || ""}, ${address.region || ""}`
            : "Location not available"}
        </Text>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    flexDirection: "row", // Ensure text and icon (if added) align in a row
    alignItems: "center", // Vertically center the text
    flex: 1, // Ensure it takes available space
  },
  locationText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.infodark,
    flexShrink: 1, // Allow text to shrink when space is tight
    textOverflow: "ellipsis", // Truncate long text with ellipsis
    maxWidth: "80%", // Limit width to prevent overflow
  },
});
