import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/theme";

const UserDetailsAdd = () => {
  const { user } = useUser();
  const router = useRouter();
  const animationRef = useRef(null);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [addresses, setAddresses] = useState([
    { line1: "", line2: "", landmark: "", city: "", state: "", pincode: "" },
  ]);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!clerkId) return;
      try {
        const res = await fetch(
          `https://shopngo-backend.onrender.com/user/${clerkId}`
        );
        const data = await res.json();
        if (res.status === 200 && data?.name) {
          router.replace("/(tabs)");
        }
      } catch (err) {
        console.log("No user exists yet.");
      }
    };
    fetchUser();
  }, [clerkId]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Media access is required to upload a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddressChange = (index: number, field: string, value: string) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { line1: "", line2: "", landmark: "", city: "", state: "", pincode: "" },
    ]);
  };

  const handleSubmit = async () => {
    if (!name || !number || !image || !email) {
      Alert.alert(
        "Missing Fields",
        "Name, number, image and email are required."
      );
      return;
    }

    const isAddressValid = addresses.every(
      (addr) => addr.line1 && addr.city && addr.state && addr.pincode
    );
    if (!isAddressValid) {
      Alert.alert(
        "Invalid Address",
        "Please fill all required address fields."
      );
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append("name", name);
      body.append("number", number);
      body.append("email", email);
      body.append("clerkId", clerkId || "");
      body.append("addresses", JSON.stringify(addresses));

      const filename = image.split("/").pop() || "photo.jpg";
      const fileType = `image/${filename.split(".").pop()}`;

      body.append("image", {
        uri: image,
        name: filename,
        type: fileType,
      } as any);

      const res = await fetch(
        "https://shopngo-backend.onrender.com/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body,
        }
      );

      const data = await res.json();

      if (
        res.status === 201 ||
        (res.status === 400 && data.message === "User already exists")
      ) {
        setAnimationVisible(true);
        setTimeout(() => {
          setAnimationVisible(false);
          router.replace("/(tabs)");
        }, 2500);
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("User creation failed:", error);
      Alert.alert("Network Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add User Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={number}
          onChangeText={setNumber}
          keyboardType="phone-pad"
        />

        {addresses.map((address, index) => (
          <View key={index} style={styles.addressContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address Line 1"
              value={address.line1}
              onChangeText={(val) => handleAddressChange(index, "line1", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Address Line 2"
              value={address.line2}
              onChangeText={(val) => handleAddressChange(index, "line2", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={address.landmark}
              onChangeText={(val) =>
                handleAddressChange(index, "landmark", val)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={address.city}
              onChangeText={(val) => handleAddressChange(index, "city", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={address.state}
              onChangeText={(val) => handleAddressChange(index, "state", val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              value={address.pincode}
              onChangeText={(val) => handleAddressChange(index, "pincode", val)}
              keyboardType="number-pad"
            />
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddAddress}
          style={styles.addAddressButton}
        >
          <Text style={styles.addAddressButtonText}>+ Add Another Address</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>
            {image ? "Change Image" : "Pick an Image"}
          </Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        {animationVisible && (
          <LottieView
            ref={animationRef}
            source={require("@/assets/animations/success.json")}
            autoPlay
            loop={false}
            style={styles.successAnimation}
          />
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#e8f1ff", // soft blue with better contrast
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a8a", // deep ocean blue
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dbeafe", // softer blue border
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: "#ffffff",
    fontSize: 15,
    color: COLORS.infodark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  addressContainer: {
    marginBottom: 10,
  },
  addAddressButton: {
    backgroundColor: "#3b82f6", // soft sky blue
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 6,
  },
  addAddressButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  imagePicker: {
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#1e40af",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  imagePickerText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 24,
    borderWidth: 4,
    borderColor: "#93c5fd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  successAnimation: {
    width: 170,
    height: 170,
    alignSelf: "center",
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: "#1e40af", // navy blue
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  disabledButton: {
    backgroundColor: "#9ebffb",
    opacity: 0.7,
  },
});

export default UserDetailsAdd;
