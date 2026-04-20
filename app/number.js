import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Keyboard,
    ScrollView,
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
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* back button */}
      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
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
          onBlur={() => Keyboard.dismiss()}
        />
      </View>

      {/* next button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push("/verification")}
        >
          <Text style={styles.nextText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    padding: 25,
    paddingBottom: 100,
  },

  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "flex-start",
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
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
    marginBottom: 40,
  },

  flag: { fontSize: 20, marginRight: 5 },
  code: { marginRight: 10, fontSize: 16 },
  input: { flex: 1, fontSize: 16 },

  buttonContainer: {
    marginTop: 20,
  },

  nextBtn: {
    backgroundColor: "#53B175",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});