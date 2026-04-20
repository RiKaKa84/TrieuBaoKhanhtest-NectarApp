/**
 * homescreen.js - Màn hình chính với thêm vào giỏ
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../_context/cart-context";
import { useAuth } from "../_context/auth-context";

/* ================= DATA ================= */

const exclusiveProducts = [
  {
    id: "h1",
    name: "Organic Bananas",
    price: 4.99,
    unit: "1kg, Price",
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
    price: 3.99,
    unit: "1kg, Price",
    image: require("../../assets/images/otchuong.png"),
  },
  {
    id: "h4",
    name: "Rau Xanh",
    price: 2.99,
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
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`${item.name} đã thêm vào giỏ`);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.id === "h2") {
          router.push({
            pathname: "/productDetail",
            params: {
              name: item.name,
              price: `$${item.price}`,
              image: item.image,
            },
          });
        }
      }}
    >
      <Image source={item.image} style={styles.img} />

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

  const renderGrocery = ({ item }) => (
    <View style={[styles.groceryCard, { backgroundColor: item.bg }]}>
      <Image source={item.image} style={styles.groceryImg} />
      <Text style={styles.groceryName}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 120, alignItems: "center" }}
        ListHeaderComponent={
          <View style={styles.container}>
            {/* LOGO */}
            <Image
              source={require("../../assets/images/carot.png")}
              style={styles.logo}
            />

            {/* Tên sinh viên */}
            <View style={styles.studentBanner}>
              <Text style={styles.studentBannerText}>
                Triệu Bảo Khanh · 23810310013
              </Text>
            </View>

            {/* Chào user */}
            {user && (
              <Text style={styles.greeting}>Xin chào, {user.name}! 👋</Text>
            )}

            {/* LOCATION */}
            <View style={styles.locationWrapper}>
              <Ionicons name="location-sharp" size={16} color="#7C7C7C" />
              <Text style={styles.locationText}>Dhaka, Banassree</Text>
            </View>

            {/* SEARCH */}
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Search Store"
                style={styles.searchInput}
              />
            </View>

            {/* BANNER */}
            <ImageBackground
              source={require("../../assets/images/fresh-vegetable.png")}
              style={styles.banner}
              imageStyle={{ borderRadius: 15 }}
            />

            {/* EXCLUSIVE */}
            <Text style={styles.section}>Exclusive Offer</Text>
            <FlatList
              data={exclusiveProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
            />

            {/* BEST SELLING */}
            <Text style={styles.section}>Best Selling</Text>
            <FlatList
              data={bestSelling}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
            />

            {/* GROCERIES */}
            <Text style={styles.section}>Groceries</Text>
            <FlatList
              data={groceries}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderGrocery}
              keyExtractor={(item) => item.id}
            />

            {/* MEAT */}
            <Text style={styles.section}>Meat</Text>
            <FlatList
              data={meats}
              horizontal
              showsHorizontalScrollIndicator={false}
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
    padding: 20,
    paddingTop: 10,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },

  logo: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginBottom: 8,
    resizeMode: "contain",
  },

  studentBanner: {
    backgroundColor: "#EBF9F1",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginBottom: 8,
  },

  studentBannerText: {
    color: "#53B175",
    fontWeight: "600",
    fontSize: 12,
  },

  greeting: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },

  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    gap: 5,
  },

  locationText: {
    fontSize: 14,
    color: "#7C7C7C",
  },

  searchBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },

  searchInput: {
    padding: 0,
  },

  banner: {
    height: 130,
    marginBottom: 20,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
    elevation: 3,
  },

  img: {
    width: 100,
    height: 80,
    alignSelf: "center",
    resizeMode: "contain",
  },

  name: {
    marginTop: 10,
    fontWeight: "600",
  },

  sub: {
    fontSize: 12,
    color: "#777",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontWeight: "bold",
  },

  addBtn: {
    backgroundColor: "#53B175",
    width: 35,
    height: 35,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    color: "#fff",
    fontSize: 18,
  },

  groceryCard: {
    width: 250,
    height: 100,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  groceryImg: {
    width: 60,
    height: 60,
    marginRight: 15,
  },

  groceryName: {
    fontSize: 16,
    fontWeight: "600",
  },
});