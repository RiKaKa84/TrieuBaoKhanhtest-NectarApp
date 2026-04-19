import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Verification() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleChange = (text) => {
    const filtered = text.replace(/[^0-9]/g, "");
    setCode(filtered);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 🎯 Nút quay lại màn hình trước */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Tiêu đề chính */}
        <Text style={styles.title}>Enter your 4-digit code</Text>

        {/* Nhãn ô nhập mã OTP */}
        <Text style={styles.label}>Code</Text>

        {/* Ô nhập mã OTP */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={4}
          value={code}
          onChangeText={handleChange}
          placeholder="----"
          placeholderTextColor="#9E9E9E"
          autoFocus={true}
          autoCorrect={false}
        />

        {/* Nút gửi lại mã */}
        <TouchableOpacity>
          <Text style={styles.resend}>Resend Code</Text>
        </TouchableOpacity>

        {/* Nút bấm tiếp theo */}
        <TouchableOpacity
          style={[
            styles.nextBtn,
            { backgroundColor: code.length === 4 ? "#53B175" : "#A5D9B8" }
          ]}
          disabled={code.length !== 4}
          onPress={() => router.push("/location")}
        >
          <Text style={styles.nextText}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Khung an toàn toàn màn hình
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // Khung chính nội dung
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  // 🎯 Nút quay lại
  backBtn: {
    marginBottom: 40,
  },

  // Biểu tượng mũi tên quay lại
  backIcon: {
    fontSize: 26,
    color: "#1D1D1D",
  },

  // Tiêu đề chính
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 35,
  },

  // Nhãn Code
  label: {
    fontSize: 15,
    color: "#8C8C8C",
    marginBottom: 12,
  },

  // Ô nhập mã OTP
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    fontSize: 26,
    letterSpacing: 12,
    paddingVertical: 10,
    marginBottom: 40,
  },

  // Nút gửi lại mã
  resend: {
    color: "#53B175",
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "flex-start",
  },

  // Nút bấm tiếp theo
  nextBtn: {
    position: "absolute",
    bottom: 40,
    right: 22,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  nextText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "700",
  },
});