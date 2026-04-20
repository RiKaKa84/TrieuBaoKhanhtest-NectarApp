/**
 * app/_layout.js - Root layout bọc TOÀN BỘ app
 * AuthProvider + CartProvider đặt ở đây để mọi màn hình đều dùng được
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth-context";
import { CartProvider } from "../contexts/cart-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="signin" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="number" />
          <Stack.Screen name="verification" />
          <Stack.Screen name="location" />
          <Stack.Screen name="productDetail" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}
