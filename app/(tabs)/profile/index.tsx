import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
  Alert,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "@/constants/theme";
import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { profileStyles } from "@/styles/profile";

const Profile = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    number: string;
    email: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const stored = await AsyncStorage.getItem("shopngo_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setUserDetails({
            name: parsed.name,
            number: parsed.number,
            email: parsed.email,
            image: parsed.image,
          });
        } else {
          console.log("No user data found in cache.");
        }
      } catch (error) {
        console.error("Failed to load user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      await AsyncStorage.removeItem("shopngo_user");
      router.replace("/login");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: string) => {
    switch (option) {
      case "Email":
        Linking.openURL(`mailto:${userDetails?.email}`);
        break;
      case "Call":
        Linking.openURL(`tel:${userDetails?.number}`);
        break;
      case "WhatsApp":
        Linking.openURL(`https://wa.me/91${userDetails?.number}`);
        break;
      case "Terms & Conditions":
        Alert.alert("Terms & Conditions", "Display your terms content here.");
        break;
      case "Privacy & Policy":
        Alert.alert("Privacy & Policy", "Display your privacy policy here.");
        break;
      default:
        console.log(`${option} clicked`);
    }
    setDropdownVisible(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Profile",
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
      <ScrollView>
        <View style={profileStyles.imageSection}>
          <View style={profileStyles.imageWrapper}>
            <Image
              source={
                imageUri ? { uri: imageUri } : { uri: userDetails?.image || "" }
              }
              style={profileStyles.image}
            />
            <TouchableOpacity
              style={profileStyles.editIcon}
              onPress={pickImage}
            >
              <MaterialIcons name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {userDetails ? (
            <View>
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.label}>👤 Name</Text>
                <Text style={profileStyles.detailText}>{userDetails.name}</Text>
              </View>
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.label}>📞 Phone</Text>
                <Text style={profileStyles.detailText}>
                  +91 {userDetails.number}
                </Text>
              </View>
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.label}>✉️ Email</Text>
                <Text style={profileStyles.detailText}>
                  {userDetails.email}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={profileStyles.detailText}>
              Loading user details...
            </Text>
          )}
        </View>
        {/* MY ACCOUNT */}
        <View style={profileStyles.contactSection}>
          <Text style={profileStyles.contactHeading}>My Account</Text>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => router.push("/profile/orders")} // Replace with your actual orders route
          >
            <MaterialCommunityIcons
              name="clipboard-list"
              size={23}
              color="#007aff"
            />
            <Text style={profileStyles.contactText}>My Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={profileStyles.contactSection}>
          <Text style={profileStyles.contactHeading}>About Us</Text>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => handleOptionClick("Privacy & Policy")}
          >
            <MaterialIcons name="privacy-tip" size={20} color="#ff0000" />
            <Text style={profileStyles.contactText}>Privacy & Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => handleOptionClick("Terms & Conditions")}
          >
            <MaterialCommunityIcons
              name="file-document-multiple"
              size={20}
              color="#00ccff"
            />
            <Text style={profileStyles.contactText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        {/* CONTACT US */}
        <View style={profileStyles.contactSection}>
          <Text style={profileStyles.contactHeading}>Contact Us</Text>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => handleOptionClick("Help & Support")}
          >
            <SimpleLineIcons name="earphones-alt" size={20} color="#333" />
            <Text style={profileStyles.contactText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => handleOptionClick("Email")}
          >
            <Entypo name="mail" size={20} color="#ff0051" />
            <Text style={profileStyles.contactText}>Email Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => handleOptionClick("Call")}
          >
            <MaterialIcons name="call" size={20} color="#00ccff" />
            <Text style={profileStyles.contactText}>Call Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={profileStyles.contactOption}
            onPress={() => handleOptionClick("WhatsApp")}
          >
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
            <Text style={profileStyles.contactText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
        {/* Logout */}
        <View style={profileStyles.container}>
          {isLoggingOut ? (
            <View style={profileStyles.loadingBox}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={profileStyles.logoutText}>Logging out...</Text>
            </View>
          ) : (
            <View style={profileStyles.buttonContainer}>
              <TouchableOpacity
                style={profileStyles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={profileStyles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
