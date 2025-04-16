import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const amount = 199.0; // You can make this dynamic

const PaymentScreen = () => {
  const upiId = "yourupi@bank"; // Replace with your actual UPI ID
  const payeeName = "My Store";

  const openUPIIntent = (appScheme: string) => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;

    Linking.openURL(upiUrl)
      .then(() => console.log("UPI Intent sent"))
      .catch(() => Alert.alert("Error", "Unable to open UPI app"));
  };

  const handleAppRedirect = (scheme: string) => {
    Linking.canOpenURL(scheme)
      .then((supported) => {
        if (supported) {
          Linking.openURL(scheme);
        } else {
          Alert.alert("App not found", "Please install the app to proceed.");
        }
      })
      .catch((err) => console.error("Error opening app", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pay ₹{amount}</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => openUPIIntent("upi://")}
      >
        <FontAwesome6 name="money-bill" size={20} color="#000" />
        <Text style={styles.optionText}>Pay via UPI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => Alert.alert("Card Payment", "Card payment coming soon!")}
      >
        <FontAwesome6 name="credit-card" size={20} color="#000" />
        <Text style={styles.optionText}>Pay with Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleAppRedirect("phonepe://")}
      >
        <FontAwesome6 name="mobile" size={20} color="#000" />
        <Text style={styles.optionText}>Pay with PhonePe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleAppRedirect("gpay://")}
      >
        <FontAwesome6 name="google-wallet" size={20} color="#000" />
        <Text style={styles.optionText}>Pay with GPay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleAppRedirect("paytmmp://")}
      >
        <FontAwesome6 name="wallet" size={20} color="#000" />
        <Text style={styles.optionText}>Pay with Paytm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fce3b1",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#000",
  },
});
