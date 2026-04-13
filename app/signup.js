import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  style={styles.btn}
  onPress={() => {
    if (!username || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    router.replace("/homescreen");
  }}
>
  <Text style={styles.btnText}>Sign Up</Text>
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