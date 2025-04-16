import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter, usePathname, useRootNavigationState } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";

export default function Index() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const pathname = usePathname();
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Wait until layout is mounted

    const inAuthGroup = pathname?.startsWith("/(auth)");

    if (!isSignedIn && !inAuthGroup) {
      console.log("Redirecting to login...");
      setCheckingUser(false);
      router.replace("/(auth)/login");
      return;
    }

    const checkUserDetails = async () => {
      if (!authLoaded || !userLoaded) return;

      if (isSignedIn && user) {
        try {
          const response = await fetch(
            `https://shopngo-backend.onrender.com/user/${user.id}`
          );

          if (response.ok) {
            setCheckingUser(false);
            router.replace("/(tabs)");
          } else {
            setCheckingUser(false);
            router.replace("/(auth)/userdetails");
          }
        } catch (err) {
          console.error("Error checking user:", err);
          setCheckingUser(false);
          router.replace("/(auth)/userdetails");
        }
      }
    };

    checkUserDetails();
  }, [
    authLoaded,
    userLoaded,
    isSignedIn,
    user?.id,
    pathname,
    rootNavigationState?.key,
  ]);

  if (!authLoaded || !userLoaded || checkingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
}
