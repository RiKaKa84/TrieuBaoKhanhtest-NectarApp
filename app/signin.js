import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SignIn() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Ảnh nền ở trên cùng */}
      <Image
        source={require("../assets/images/raucu.png")}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Tiêu đề chính */}
      <Text style={styles.title}>
        Get your groceries{"\n"}with nectar
      </Text>

      {/* Khung nhập số điện thoại theo mẫu */}
      <TouchableOpacity
        style={styles.phoneInputWrapper}
        onPress={() => router.push("/number")}
      >
        {/* Cờ quốc gia Bangladesh */}
        <View style={styles.flagWrapper}>
          <Image 
            source={require("../assets/images/bd-flag.png")}
            style={styles.flagImage}
            resizeMode="contain"
          />
          <Text style={styles.countryCode}>+880</Text>
        </View>

        <Text style={styles.phonePlaceholder}>Enter your phone number</Text>
      </TouchableOpacity>

      {/* Chữ Or connect with social media */}
      <Text style={styles.orText}>Or connect with social media</Text>

      {/* Nút Continue with Google */}
      <TouchableOpacity style={[styles.socialBtn, { backgroundColor: "#4285F4" }]}>
        <Text style={styles.socialIcon}>G</Text>
        <Text style={styles.socialBtnText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Nút Continue with Facebook */}
      <TouchableOpacity style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}>
        <Text style={styles.socialIcon}>f</Text>
        <Text style={styles.socialBtnText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Khung chính toàn màn hình
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },

  // Ảnh nền rau củ
  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 25,
  },

  // Tiêu đề chính
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D1D1D",
    marginBottom: 28,
    lineHeight: 36,
  },

  // Khung nhập số điện thoại
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#53B175",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 15,
  },

  // Khung cờ và mã quốc gia
  flagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  // Ảnh cờ quốc gia
  flagImage: {
    width: 22,
    height: 16,
    marginRight: 8,
  },

  // Mã quốc gia
  countryCode: {
    fontSize: 16,
    color: "#1D1D1D",
    fontWeight: "500",
  },

  // Placeholder ô nhập số điện thoại
  phonePlaceholder: {
    fontSize: 16,
    color: "#9E9E9E",
    flex: 1,
  },

  // Chữ Or connect with social media
  orText: {
    textAlign: "center",
    color: "#8C8C8C",
    fontSize: 14,
    marginBottom: 25,
  },

  // Khung nút mạng xã hội
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
  },

  // Biểu tượng mạng xã hội
  socialIcon: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 18,
    width: 24,
    textAlign: "center",
  },

  // Chữ trên nút mạng xã hội
  socialBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});