import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Verification() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Enter your 4-digit code</Text>

      {/* Label */}
      <Text style={styles.label}>Code</Text>

      {/* OTP input */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={4} // 🔥 chỉ 4 số
        value={code}
        onChangeText={(text) => {
          const filtered = text.replace(/[^0-9]/g, ""); // 🔥 chặn chữ
          setCode(filtered);
        }}
        placeholder="----"
        placeholderTextColor="#bbb"
      />

      {/* resend */}
      <Text style={styles.resend}>Resend Code</Text>

      {/* next button */}
      <TouchableOpacity
        style={[
          styles.nextBtn,
          { backgroundColor: code.length === 4 ? "#53B175" : "#ccc" },
        ]}
        disabled={code.length !== 4}
        onPress={() => router.push("/location")}
      >
        <Text style={styles.nextText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,

    // 🔥 đẩy layout lên trên giống UI app
    justifyContent: "flex-start",
    paddingTop: 120,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },

  label: {
    color: "#888",
    marginBottom: 10,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 26,
    letterSpacing: 12, // 🔥 tạo kiểu ----
    paddingVertical: 10,
  },

  resend: {
    color: "#53B175",
    marginTop: 20,
    fontWeight: "500",
  },

  nextBtn: {
    position: "absolute",
    bottom: 120,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  nextText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});