import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const categories = [
  {
    id: "1",
    name: "Frash Fruits & Vegetable",
    image: require("@/assets/images/frash.png"),
    color: "#E8F5E9",
  },
  {
    id: "2",
    name: "Cooking Oil & Ghee",
    image: require("@/assets/images/oil.png"),
    color: "#FFF3E0",
  },
  {
    id: "3",
    name: "Meat & Fish",
    image: require("@/assets/images/meat.png"),
    color: "#FCE4EC",
  },
  {
    id: "4",
    name: "Bakery & Snacks",
    image: require("@/assets/images/bakery.png"),
    color: "#F3E5F5",
  },
  {
    id: "5",
    name: "Dairy & Eggs",
    image: require("@/assets/images/dairy.png"),
    color: "#FFFDE7",
  },
  {
    id: "6",
    name: "Beverages",
    image: require("@/assets/images/beverages.png"),
    color: "#E3F2FD",
  },
];

export default function TabTwoScreen() {
  const router = useRouter();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            textAlign: "center",
          }}
        >
          Find Products
        </ThemedText>

        {/* Search */}
        <ThemedView style={styles.search}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput placeholder="Search Store" style={styles.input} />
        </ThemedView>

        {/* Categories */}
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: item.color }]}
              onPress={() => {
                if (item.name === "Beverages") {
                  router.push("/beverages");
                }
              }}
            >
              <Image source={item.image} style={styles.image} />
              <ThemedText style={styles.text}>{item.name}</ThemedText>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 12,
    marginVertical: 15,
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 18,
    padding: 15,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
  },

  text: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});