import { useRouter } from "expo-router";
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.fullContainer}>
      <View style={styles.screenWrapper}>
        {/* Label góc trên */}
        <Text style={styles.pageLabel}>onboarding</Text>

        {/* Ảnh nền */}
        <ImageBackground
          source={require("../assets/images/anh.png")}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          {/* Overlay + content */}
          <View style={styles.overlay}>
            <View style={styles.contentWrapper}>
              {/* Logo */}
              <Image
                source={require("../assets/images/carrot.png")}
                style={styles.logo}
                resizeMode="contain"
              />

              {/* Text */}
              <View style={styles.textSection}>
                <Text style={styles.mainTitle}>
                  Welcome{"\n"}to our store
                </Text>
                <Text style={styles.subTitle}>
                  Get your groceries in as fast as one hour
                </Text>
              </View>

              {/* Button */}
              <TouchableOpacity
                style={styles.getStartedBtn}
                onPress={() => router.push("/signin")}
              >
                <Text style={styles.btnText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 12,
  },

  screenWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  pageLabel: {
    fontSize: 14,
    color: "#8892a5",
    marginBottom: 8,
    marginLeft: 4,
  },

  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  // ✅ đảm bảo ảnh luôn nằm giữa, không bị lệch
  imageStyle: {
    resizeMode: "cover",
    alignSelf: "center",
    
  },

  // lớp phủ nhẹ để dễ đọc chữ
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },

  contentWrapper: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  logo: {
    width: 60,
    height: 60,
    marginBottom: 28,
  },

  textSection: {
    alignItems: "center",
    marginBottom: 35,
  },

  mainTitle: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 50,
    textAlign: "center",
    marginBottom: 6,
  },

  subTitle: {
    color: "#e5e7eb",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  getStartedBtn: {
    backgroundColor: "#53B175",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  btnText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 17,
  },
});