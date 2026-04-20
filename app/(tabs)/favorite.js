import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../contexts/cart-context";

const screenWidth = Dimensions.get("window").width;

// Dữ liệu Favorites sẽ lấy từ CartContext động

export default function FavouriteScreen() {
  const { favorites, addAllToCart, toggleFavorite } = useCart();

  const handleAddAllToCart = () => {
    if (favorites.length === 0) {
      Alert.alert("Empty", "You have no favorite items to add.");
      return;
    }
    addAllToCart(favorites);
    Alert.alert("Success", "All items have been added to your cart.");
  };

  const renderItem = ({ item, index }) => {
    // Giá có thể là số hoặc chuỗi, chuẩn hóa để hiển thị
    const priceValue = typeof item.price === "number" ? item.price : parseFloat(item.price?.toString()?.replace(/[^0-9.]/g, "") || 0);

    return (
      <View>
        <View style={styles.productItem}>
          <Image source={item.image} style={styles.productImage} contentFit="contain" />

          <View style={styles.productDetails}>
            <Text style={styles.productName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.productDescription}>{item.unit || item.description}</Text>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.productPrice}>${priceValue.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.removeBtn} 
              onPress={() => toggleFavorite(item)}
            >
              <Ionicons name="close" size={20} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        {index !== favorites.length - 1 && (
          <View style={styles.divider} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Favorites</Text>
      </View>

      {/* LIST OR EMPTY VIEW */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>Your favorites list is empty</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FOOTER BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.addAllBtn, favorites.length === 0 && styles.btnDisabled]} 
          onPress={handleAddAllToCart}
          disabled={favorites.length === 0}
        >
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181725",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#181725",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    marginRight: 10,
  },
  removeBtn: {
    padding: 8,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E2E2",
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
  },
  addAllBtn: {
    backgroundColor: "#53B175",
    height: 67,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  addAllText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#7C7C7C",
    marginTop: 20,
    fontWeight: "500",
  },
  btnDisabled: {
    backgroundColor: "#AAA",
    opacity: 0.7,
  },
});