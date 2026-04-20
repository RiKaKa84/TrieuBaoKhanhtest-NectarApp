import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Danh mục sản phẩm
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
    isSpecial: true,
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // 👉 xử lý search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/search",
        params: { query: searchQuery.trim() },
      });
    }
  };

  // 👉 clear input
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // 👉 click category
  const handleCategoryPress = (item) => {
    if (item.isSpecial) {
      router.push("/beverages");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.innerContainer}>
        {/* TITLE */}
        <ThemedText style={styles.pageTitle}>Find Products</ThemedText>

        {/* SEARCH BAR */}
        <ThemedView style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />

          <TextInput
            placeholder="Search Store"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />

          {searchQuery ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          ) : null}
        </ThemedView>

        {/* CATEGORY GRID */}
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryCard,
                { backgroundColor: item.color },
              ]}
              onPress={() => handleCategoryPress(item)}
              activeOpacity={0.85}
            >
              <Image source={item.image} style={styles.categoryImage} contentFit="contain" />
              <ThemedText style={styles.categoryName}>
                {item.name}
              </ThemedText>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 20,
  },

  pageTitle: {
    fontSize: 26,
    fontFamily: Fonts.roundedBold,
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 50,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },

  categoryCard: {
    width: "48%",
    alignItems: "center",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },

  categoryImage: {
    width: 80,
    height: 80,
  },

  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    color: "#000",
  },
});