import { useRouter } from "expo-router";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

export default function SignIn() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../assets/images/raucu.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Get your groceries{"\n"}with nectar
      </Text>

      {/* 👉 khi bấm sẽ sang NUMBER screen */}
      <TouchableOpacity
        style={styles.phoneBtn}
        onPress={() => router.push("/number")}
      >
        <Text style={styles.phoneText}>Use phone number</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Or connect with social media</Text>

      <TouchableOpacity style={[styles.btn, { backgroundColor: "#5383EC" }]}>
        <Text style={styles.iconText}>G</Text>
        <Text style={styles.btnText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: "#4A66AC" }]}>
        <Text style={styles.iconText}>f</Text>
        <Text style={styles.btnText}>Continue with Facebook</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },

  image: {
    width: "100%",
    height: 220,
    marginTop: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
  },

  phoneBtn: {
    backgroundColor: "#53B175",
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
  },

  phoneText: {
    color: "#fff",
    fontWeight: "600",
  },

  or: {
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    paddingLeft: 25,
    borderRadius: 18,
    marginBottom: 15,
  },

  iconText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
  },

  btnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});