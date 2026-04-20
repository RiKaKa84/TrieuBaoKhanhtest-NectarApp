/**
 * homescreen.js - Màn hình chính với thêm vào giỏ
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
    Alert,
    Dimensions,
    FlatList,
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/auth-context";
import { useCart } from "../../contexts/cart-context";

const screenWidth = Dimensions.get("window").width;
const isSmallScreen = screenWidth < 600;

/* ================= DATA ================= */

const exclusiveProducts = [
  {
    id: "h1",
    name: "Organic Bananas",
    price: 4.99,
    unit: "7pcs, Price",
    image: require("../../assets/images/banana.png"),
  },
  {
    id: "h2",
    name: "Red Apple",
    price: 4.99,
    unit: "1kg, Price",
    image: require("../../assets/images/apple.png"),
  },
];

const bestSelling = [
  {
    id: "h3",
    name: "Ớt Chuông",
    price: 4.99,
    unit: "1kg, Price",
    image: require("../../assets/images/otchuong.png"),
  },
  {
    id: "h4",
    name: "Rau Xanh",
    price: 4.99,
    unit: "1kg, Price",
    image: require("../../assets/images/rau.png"),
  },
];

const groceries = [
  {
    id: "h5",
    name: "Pulses",
    image: require("../../assets/images/pulses.png"),
    bg: "#F8EDE3",
  },
  {
    id: "h6",
    name: "Rice",
    image: require("../../assets/images/rice.png"),
    bg: "#E8F5E9",
  },
];

const meats = [
  {
    id: "h7",
    name: "Beef Bone",
    price: 4.99,
    unit: "500g, Price",
    image: require("../../assets/images/thitbo.png"),
  },
  {
    id: "h8",
    name: "Broiler Chicken",
    price: 4.99,
    unit: "1kg, Price",
    image: require("../../assets/images/thitga.png"),
  },
];

/* ================= COMPONENT ================= */

function showToast(message) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("", message);
  }
}

export default function HomeScreen() {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`${item.name} đã thêm vào giỏ`);
  };

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          if (["h1", "h2", "h3", "h4", "h7", "h8"].includes(item.id)) {
            router.push({
              pathname: "/productDetail",
              params: { id: item.id },
            });
          }
        }}
      >
        {/* Heart Icon */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons
            name={isFavorite(item.id) ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite(item.id) ? "#53B175" : "#999"}
          />
        </TouchableOpacity>

        <Image source={item.image} style={styles.img} contentFit="contain" />

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>{item.unit ?? "1kg, Price"}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${item.price?.toFixed(2)}</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGrocery = ({ item }) => (
    <View style={[styles.groceryCard, { backgroundColor: item.bg }]}>
      <Image source={item.image} style={styles.groceryImg} contentFit="contain" />
      <Text style={styles.groceryName}>{item.name}</Text>
    </View>
  );

  const renderSectionHeader = (title) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={() => router.push("/explore")}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.container}>
            {/* LOCATION */}
            <View style={styles.locationWrapper}>
              <Ionicons name="location-sharp" size={20} color="#53B175" />
              <Text style={styles.locationText}>Dhaka, Banassree</Text>
            </View>

            {/* SEARCH */}
            <View style={styles.searchBox}>
              <Ionicons name="search" size={18} color="#999" />
              <TextInput
                placeholder="Search Store"
                style={styles.searchInput}
                placeholderTextColor="#999"
              />
            </View>

            {/* BANNER */}
            <ImageBackground
              source={require("../../assets/images/fresh-vegetable.png")}
              style={styles.banner}
              imageStyle={{ borderRadius: 12 }}
            >
              <View style={styles.bannerDots}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </ImageBackground>

            {/* EXCLUSIVE */}
            {renderSectionHeader("Exclusive Offer")}
            <FlatList
              data={exclusiveProducts}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
            />

            {/* BEST SELLING */}
            {renderSectionHeader("Best Selling")}
            <FlatList
              data={bestSelling}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
            />

            {/* GROCERIES */}
            {renderSectionHeader("Groceries")}
            <FlatList
              data={groceries}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={renderGrocery}
              keyExtractor={(item) => item.id}
            />

            {/* MEAT */}
            {renderSectionHeader("Meat")}
            <FlatList
              data={meats}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    width: "100%",
  },

  list: {
    width: "100%",
  },

  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },

  locationText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  searchBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  banner: {
    height: 115,
    marginBottom: 24,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },

  bannerDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  activeDot: {
    backgroundColor: "#53B175",
    width: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  seeAll: {
    fontSize: 14,
    color: "#53B175",
    fontWeight: "600",
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: (screenWidth - 48) / 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },

  img: {
    width: "100%",
    height: 120,
    marginBottom: 8,
  },

  heartBtn: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 10,
    padding: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },

  sub: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontWeight: "700",
    fontSize: 14,
    color: "#000",
  },

  addBtn: {
    backgroundColor: "#53B175",
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  groceryCard: {
    width: (screenWidth - 48) / 2,
    height: 110,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  groceryImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  groceryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
});