import { useRouter } from "expo-router";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Onboarding() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        
        {/* 🥕 Carrot logo */}
        <Image
          source={require("../assets/images/carrot.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Welcome{"\n"}to our store
          </Text>

          <Text style={styles.desc}>
            Get your groceries in as fast as one hour
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/signin")}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 25,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  // 🥕 logo carrot
  logo: {
    position: "absolute",
    bottom: 260,
    alignSelf: "center",
    width: 60,
    height: 60,
  },

  content: {
    marginBottom: 30,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 42,
  },

  desc: {
    color: "#ddd",
    marginTop: 10,
    marginBottom: 25,
    fontSize: 14,
  },

  button: {
    backgroundColor: "#53B175",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});