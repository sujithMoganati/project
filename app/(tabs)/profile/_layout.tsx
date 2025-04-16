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
        name="orders"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: "orange",
          },
          headerTintColor: "#ffffff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/profile")}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
