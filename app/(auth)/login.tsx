import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { styles } from "@/styles/auth.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/(auth)/userdetails");
      }
    } catch (error) {
      console.log("Google OAuth-error: ", error);
    }
  };

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.logText}>Loading user info...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <View style={styles.brandSection}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleAuth}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.logText}>
        By continuing, you agree to our Terms and Privacy Policy.
      </Text>
    </View>
  );
}
