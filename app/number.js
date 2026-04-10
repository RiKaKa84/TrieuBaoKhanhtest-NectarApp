import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function NumberScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleChange = (text) => {
    const filtered = text.replace(/[^0-9]/g, "");
    setPhone(filtered);
  };

  return (
    <View style={styles.container}>
      {/* back */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Enter your mobile number</Text>

      <Text style={styles.label}>Mobile Number</Text>

      {/* input */}
      <View style={styles.inputBox}>
        <Text style={styles.flag}>🇧🇩</Text>
        <Text style={styles.code}>+880</Text>

        <TextInput
          value={phone}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={11}
          style={styles.input}
        />
      </View>

      {/* next button */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => router.push("/verification")}
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
  },

  back: {
    fontSize: 24,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    color: "#888",
    marginBottom: 10,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
  },

  flag: { fontSize: 20, marginRight: 5 },
  code: { marginRight: 10, fontSize: 16 },
  input: { flex: 1, fontSize: 16 },

  nextBtn: {
    position: "absolute",
    bottom: 120,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});