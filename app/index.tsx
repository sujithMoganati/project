import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";

export default function Index() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    const checkUserDetails = async () => {
      if (!authLoaded || !userLoaded) return;

      const inAuthGroup = pathname?.startsWith("/(auth)");
      const hasCachedUser = !!user;

      console.log("📍 Pathname:", pathname);
      console.log("🔁 Redirect Check ->", {
        isSignedIn,
        hasCachedUser,
        inAuthGroup,
      });

      if (!isSignedIn && !hasCachedUser && !inAuthGroup) {
        router.replace("/(auth)/login");
        return;
      }

      if (isSignedIn && hasCachedUser) {
        try {
          const response = await fetch(
            `https://shopngo-backend.onrender.com/user/${user.id}`
          );

          if (response.status === 200) {
            console.log("✅ User exists in backend, navigating to /tabs");
            router.replace("/(tabs)");
          } else {
            console.log("🆕 User not found, navigating to user details form");
            router.replace("/(auth)/userdetails");
          }
        } catch (err) {
          console.error("Error checking user:", err);
          router.replace("/(auth)/userdetails");
        } finally {
          setCheckingUser(false);
        }
      }
    };

    checkUserDetails();
  }, [authLoaded, userLoaded, isSignedIn, user, pathname]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}
