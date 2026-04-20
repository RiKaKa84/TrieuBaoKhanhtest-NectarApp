import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Dữ liệu sản phẩm
const SEARCH_PRODUCTS = [
  {
    id: "e1",
    name: "Egg Chicken Red",
    price: "$1.99",
    size: "4pcs, Price",
    image: require("@/assets/images/egg-red-basket.png"),
  },
  {
    id: "e2",
    name: "Egg Chicken White",
    price: "$1.50",
    size: "180g, Price",
    image: require("@/assets/images/egg-white-basket.png"),
  },
  {
    id: "e3",
    name: "Egg Pasta",
    price: "$15.99",
    size: "30gm, Price",
    image: require("@/assets/images/egg-pasta.png"),
  },
  {
    id: "e4",
    name: "Egg Noodles",
    price: "$15.99",
    size: "2L, Price",
    image: require("@/assets/images/egg-noodles.png"),
  },
  {
    id: "e5",
    name: "Mayonnais Eggless",
    price: "$4.99",
    size: "325ml, Price",
    image: require("@/assets/images/mayo.png"),
  },
  {
    id: "e6",
    name: "Egg Noodles",
    price: "$15.99",
    size: "",
    image: require("@/assets/images/egg-noodles-purple.png"),
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const { query: initialQuery } = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [filteredProducts, setFilteredProducts] = useState(SEARCH_PRODUCTS);

  // 🔍 Lọc sản phẩm
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(SEARCH_PRODUCTS);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase().trim();
    const filtered = SEARCH_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery)
    );

    setFilteredProducts(filtered);
  }, [searchQuery]);

  // 👉 Khi bấm Enter
  const handleSubmit = () => {
    if (!searchQuery.trim()) {
      router.back(); // 🔥 quay về explore
    }
  };

  // 👉 Khi bấm nút X
  const handleClear = () => {
    setSearchQuery("");
    router.back(); // 🔥 quay về explore
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} contentFit="contain" />
      <ThemedText style={styles.productName}>{item.name}</ThemedText>

      {item.size && (
        <ThemedText style={styles.productMeta}>
          {item.size}
        </ThemedText>
      )}

      <View style={styles.productBottom}>
        {item.price && (
          <ThemedText style={styles.productPrice}>
            {item.price}
          </ThemedText>
        )}

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.innerContainer}>
        <View style={styles.searchRow}>
          <ThemedView style={styles.searchBar}>
            <Ionicons name="search" size={20} color="gray" />

            <TextInput
              placeholder="Search Store"
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
              onSubmitEditing={handleSubmit}
            />

            {searchQuery ? (
              <TouchableOpacity onPress={handleClear}>
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
            ) : null}
          </ThemedView>

          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => router.push("/filters")}
          >
            <Ionicons name="options-outline" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* PRODUCT LIST */}
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={renderProductItem}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  innerContainer: {
    padding: 15,
    gap: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  filterBtn: {
    marginLeft: 10,
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  productCard: {
    flex: 1,
    margin: 8,
    minWidth: 160,
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  productMeta: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginBottom: 8,
  },
  productBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
});