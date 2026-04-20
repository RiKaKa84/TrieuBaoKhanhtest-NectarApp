/**
 * index.js - Entry point với auto-login logic
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getUser } from "../services/storageService";

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setHasUser(!!user);
      } catch (e) {
        setHasUser(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#53B175" }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Nếu đã từng đăng nhập → vào thẳng app, không qua splash/onboarding
  if (hasUser) {
    return <Redirect href="/(tabs)/homescreen" />;
  }

  return <Redirect href="/splash" />;
}