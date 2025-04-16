import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { View, Image } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Tab Navigator */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          headerShown: false,
          tabBarActiveTintColor: COLORS.info,
          tabBarInactiveTintColor: COLORS.grey,
          tabBarHideOnKeyboard: false,
          tabBarStyle: {
            backgroundColor: "#fce3b1",
            borderTopColor: "#eee",
            height: 70,
            paddingTop: 8,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",

            // Shadow for elevation
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 8,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="home" size={focused ? 30 : 25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            tabBarLabel: "categories",
            tabBarIcon: ({ color, focused }) => (
              <AntDesign
                name="appstore1"
                size={focused ? 28 : 23}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="cart" size={focused ? 32 : 28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="user" size={focused ? 32 : 28} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
