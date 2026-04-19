import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FiltersScreen() {
  const router = useRouter();

  const [categories, setCategories] = useState({
    eggs: true,
    noodles: false,
    chips: false,
    fastfood: false,
  });

  const [brands, setBrands] = useState({
    individual: false,
    cocola: true,
    ifad: false,
    kazi: false,
  });

  const toggle = (group, key) => {
    if (group === "cat") {
      setCategories({ ...categories, [key]: !categories[key] });
    } else {
      setBrands({ ...brands, [key]: !brands[key] });
    }
  };

  const Checkbox = ({ label, checked, onPress }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={[styles.box, checked && styles.boxActive]}>
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.section}>Categories</Text>

        <Checkbox
          label="Eggs"
          checked={categories.eggs}
          onPress={() => toggle("cat", "eggs")}
        />
        <Checkbox
          label="Noodles & Pasta"
          checked={categories.noodles}
          onPress={() => toggle("cat", "noodles")}
        />
        <Checkbox
          label="Chips & Crisps"
          checked={categories.chips}
          onPress={() => toggle("cat", "chips")}
        />
        <Checkbox
          label="Fast Food"
          checked={categories.fastfood}
          onPress={() => toggle("cat", "fastfood")}
        />

        <Text style={[styles.section, { marginTop: 20 }]}>Brand</Text>

        <Checkbox
          label="Individual Collection"
          checked={brands.individual}
          onPress={() => toggle("brand", "individual")}
        />
        <Checkbox
          label="Cocola"
          checked={brands.cocola}
          onPress={() => toggle("brand", "cocola")}
        />
        <Checkbox
          label="Ifad"
          checked={brands.ifad}
          onPress={() => toggle("brand", "ifad")}
        />
        <Checkbox
          label="Kazi Farmas"
          checked={brands.kazi}
          onPress={() => toggle("brand", "kazi")}
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F2",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },

  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  boxActive: {
    backgroundColor: "#53B175",
    borderColor: "#53B175",
  },

  label: {
    fontSize: 14,
  },

  button: {
    marginTop: "auto",
    backgroundColor: "#53B175",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});