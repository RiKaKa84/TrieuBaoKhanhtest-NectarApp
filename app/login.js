/**
 * login.js - Màn hình đăng nhập với AsyncStorage
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../contexts/auth-context";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email.trim(), password.trim());
      if (result.success) {
        // Tắt loading trước
        setLoading(false);
        // Delay để state cập nhật trước khi navigate
        setTimeout(() => {
          router.replace("/(tabs)/homescreen");
        }, 100);
      } else {
        setLoading(false);
        Alert.alert("Đăng nhập thất bại", result.message);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <View style={styles.container}>
      {/* Thông tin sinh viên */}
      <View style={styles.studentBadge}>
        <Text style={styles.studentText}>Triệu Bảo Khanh · 23810310013</Text>
      </View>

      {/* logo */}
      <Image
        source={require("../assets/images/carot.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* title */}
      <Text style={styles.title}>Login</Text>

      {/* subtitle */}
      <Text style={styles.subTitle}>
        Enter your email and password
      </Text>

      {/* email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      {/* password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />

      {/* hint */}
      <Text style={styles.hint}>Email hoặc tên, ví dụ: user@nectar.com / 123456</Text>

      {/* forgot password */}
      <Text style={styles.forgot}>Forgot Password?</Text>

      {/* login button */}
      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Log In</Text>
        )}
      </TouchableOpacity>

      {/* signup link */}
      <Text style={styles.bottomText}>
        Don't have an account?{" "}
        <Text
          style={styles.signup}
          onPress={() => router.push("/signup")}
        >
          Signup
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "center",
  },

  studentBadge: {
    backgroundColor: "#EBF9F1",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "center",
    marginBottom: 20,
  },

  studentText: {
    color: "#53B175",
    fontWeight: "600",
    fontSize: 13,
  },

  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },

  subTitle: {
    color: "#888",
    marginBottom: 25,
  },

  label: {
    color: "#888",
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    fontSize: 16,
  },

  hint: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 8,
    fontStyle: "italic",
  },

  forgot: {
    color: "#53B175",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "500",
  },

  btn: {
    backgroundColor: "#53B175",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  btnDisabled: {
    backgroundColor: "#a0d9b4",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  bottomText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },

  signup: {
    color: "#53B175",
    fontWeight: "bold",
  },
});