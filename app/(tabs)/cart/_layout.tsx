import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchStackLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderPayment"
        options={{
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#0000c5",
          },
          headerTintColor: "#ffffff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/(tabs)/cart")}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
