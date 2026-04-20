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

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* logo */}
      <Image
        source={require("../assets/images/carot.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* subtitle */}
      <Text style={styles.subTitle}>
        Enter your credentials to continue
      </Text>

      {/* username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        style={styles.input}
      />

      {/* email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
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

      {/* terms */}
      <Text style={styles.terms}>
        By continuing you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      {/* signup button */}
      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={async () => {
          if (!username.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
          }

          setLoading(true);
          try {
            const result = await signup(username.trim(), email.trim(), password);
            if (result.success) {
              // Tắt loading trước khi navigate
              setLoading(false);
              // Delay để đảm bảo state cập nhật
              setTimeout(() => {
                router.replace("/(tabs)/homescreen");
              }, 100);
            } else {
              setLoading(false);
              Alert.alert("Lỗi", result.message);
            }
          } catch (error) {
            setLoading(false);
            Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại");
          }
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* login link */}
      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Text
          style={styles.signup}
          onPress={() => router.push("/login")}
        >
          Login
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

  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
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

  terms: {
    color: "#888",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 20,
  },

  link: {
    color: "#53B175",
  },

  btn: {
    backgroundColor: "#53B175",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  btnDisabled: {
    backgroundColor: "#999",
    opacity: 0.7,
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