import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useCart } from "../_context/cart-context";

const favouriteProducts = [
  {
    id: "sprite-can-325ml",
    name: "Sprite Can",
    description: "325ml, Price",
    price: "$1.50",
    image: require("@/assets/images/sprite-can.png"),
  },
  {
    id: "diet-coke-355ml",
    name: "Diet Coke",
    description: "355ml, Price",
    price: "$1.99",
    image: require("@/assets/images/diet-coke.png"),
  },
  {
    id: "apple-grape-juice-2l",
    name: "Apple & Grape Juice",
    description: "2L, Price",
    price: "$15.50",
    image: require("@/assets/images/apple-and-grape-juice.png"),
  },
  {
    id: "coca-cola-can-325ml",
    name: "Coca Cola Can",
    description: "325ml, Price",
    price: "$4.99",
    image: require("@/assets/images/cocacola.png"),
  },
  {
    id: "pepsi-can-330ml",
    name: "Pepsi Can",
    description: "330ml, Price",
    price: "$4.99",
    image: require("@/assets/images/pepsi.png"),
  },
];

export default function FavouriteScreen() {
  const { addAllToCart } = useCart();

  const handleAddAllToCart = () => {
    addAllToCart(favouriteProducts);
    alert("All favourite items were added to My Cart.");
  };

  return (
    <ThemedView style={styles.container}>
      {/* HEADER */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.pageTitle}>Favourite</ThemedText>
      </ThemedView>

      {/* LIST */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favouriteProducts.map((item, index) => (
          <View key={item.id}>
            <TouchableOpacity style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />

              <ThemedView style={styles.productDetails}>
                <ThemedText style={styles.productName}>
                  {item.name}
                </ThemedText>
                <ThemedText style={styles.productDescription}>
                  {item.description}
                </ThemedText>
              </ThemedView>

              <ThemedText style={styles.productPrice}>
                {item.price}
              </ThemedText>

              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* 🔥 Divider đậm hơn */}
            {index !== favouriteProducts.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* 🔥 BUTTON dưới cùng */}
      <View style={styles.bottomSection}>
        <View style={styles.topDivider} />

        <TouchableOpacity
          style={styles.addAllButton}
          onPress={handleAddAllToCart}
        >
          <ThemedText style={styles.addAllButtonText}>
            Add All To Cart
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  pageTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: Fonts.roundedBold,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },

  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 26,
  },

  productImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 12,
  },

  productDetails: {
    flex: 1,
  },

  productName: {
    fontSize: 15,
    fontFamily: Fonts.roundedBold,
    color: "#222",
  },

  productDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  productPrice: {
    fontSize: 15,
    fontFamily: Fonts.roundedBold,
    marginRight: 10,
  },
divider: {
  height: 1,
  backgroundColor: "#cfcfcf",
  marginLeft: 0,   // 👈 từ đầu dòng luôn
  marginRight: 0,
  marginVertical: 10,
},

  /* 🔥 Section dưới */
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  /* 🔥 Gạch ngang trên button */
  topDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 15,
  },

  addAllButton: {
    backgroundColor: "#53B175",
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
  },

  addAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.roundedBold,
  },
});