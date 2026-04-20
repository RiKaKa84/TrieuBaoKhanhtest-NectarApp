/**
 * _layout.js - Tab layout với AuthProvider + CartProvider
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { AuthProvider } from "../_context/auth-context";
import { CartProvider } from "../_context/cart-context";

export default function TabLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#53B175",
            tabBarStyle: {
              height: 60,
              paddingBottom: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        >
          <Tabs.Screen
            name="homescreen"
            options={{
              title: "Shop",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="storefront-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="orders"
            options={{
              title: "Orders",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="receipt-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="favorite"
            options={{
              title: "Favorite",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart-outline" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="account"
            options={{
              title: "Account",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </CartProvider>
    </AuthProvider>
  );
}