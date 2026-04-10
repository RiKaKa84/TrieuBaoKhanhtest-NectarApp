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

export default function Location() {
  const router = useRouter();

  const [zone, setZone] = useState("");
  const [area, setArea] = useState("");

  return (
    <View style={styles.container}>
      {/* image */}
      <Image
        source={require("../assets/images/vitri.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* title */}
      <Text style={styles.title}>Select Your Location</Text>

      <Text style={styles.desc}>
        Switch on your location to stay in tune with what's happening in your area
      </Text>

      {/* YOUR ZONE */}
      <Text style={styles.label}>Your Zone</Text>

      <View style={styles.inputBox}>
        <TextInput
          value={zone}
          onChangeText={setZone}
          placeholder="Enter your zone"
          style={styles.input}
        />
        <Text style={styles.arrow}>▼</Text>
      </View>

      {/* YOUR AREA */}
      <Text style={styles.label}>Your Area</Text>

      <View style={styles.inputBox}>
        <TextInput
          value={area}
          onChangeText={setArea}
          placeholder="Enter your area"
          style={styles.input}
        />
        <Text style={styles.arrow}>▼</Text>
      </View>

      {/* button */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
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

  image: {
    width: "100%",
    height: 180,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  desc: {
    textAlign: "center",
    color: "#888",
    marginVertical: 15,
  },

  label: {
    color: "#888",
    marginTop: 15,
    marginBottom: 5,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  arrow: {
    color: "#888",
    fontSize: 14,
    marginLeft: 10,
  },

  btn: {
    backgroundColor: "#53B175",
    padding: 16,
    borderRadius: 18,
    marginTop: 30,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});