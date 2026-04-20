/**
 * index.js - Entry point với auto-login logic
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/auth-context";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#53B175" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Nếu đã đăng nhập → vào thẳng app
  if (user) {
    return <Redirect href="/(tabs)/homescreen" />;
  }

  // Chưa đăng nhập → vào trang Login ngay, không qua Splash
  return <Redirect href="/login" />;
}