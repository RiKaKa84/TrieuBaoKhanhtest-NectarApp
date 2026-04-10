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

export default function Login() {
  const router = useRouter();

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
      <Text style={styles.title}>Login</Text>

      {/* subtitle */}
      <Text style={styles.subTitle}>
        Enter your emails and password
      </Text>

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

      {/* forgot password */}
      <Text style={styles.forgot}>Forgot Password?</Text>

      {/* login button */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>

      {/* signup link */}
      <Text style={styles.bottomText}>
        Don’t have an account?{" "}
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