import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ================= DATA ================= */

const exclusiveProducts = [
  {
    id: "1",
    name: "Organic Bananas",
    price: "$4.99",
    image: require("../../assets/images/banana.png"),
  },
  {
    id: "2",
    name: "Red Apple",
    price: "$4.99",
    image: require("../../assets/images/apple.png"),
  },
];

const bestSelling = [
  {
    id: "3",
    name: "Ớt Chuông",
    price: "$3.99",
    image: require("../../assets/images/otchuong.png"),
  },
  {
    id: "4",
    name: "Rau Xanh",
    price: "$2.99",
    image: require("../../assets/images/rau.png"),
  },
];

const groceries = [
  {
    id: "5",
    name: "Pulses",
    image: require("../../assets/images/pulses.png"),
    bg: "#F8EDE3",
  },
  {
    id: "6",
    name: "Rice",
    image: require("../../assets/images/rice.png"),
    bg: "#E8F5E9",
  },
];

const meats = [
  {
    id: "7",
    name: "Beef Bone",
    price: "$4.99",
    image: require("../../assets/images/thitbo.png"),
  },
  {
    id: "8",
    name: "Broiler Chicken",
    price: "$4.99",
    image: require("../../assets/images/thitga.png"),
  },
];

/* ================= COMPONENT ================= */

export default function HomeScreen() {
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/productDetail",
          params: {
            name: item.name,
            price: item.price,
            image: item.image, // ✅ FIX QUAN TRỌNG
          },
        })
      }
    >
      <Image source={item.image} style={styles.img} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.sub}>1kg, Price</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>{item.price}</Text>

        <TouchableOpacity style={styles.addBtn}>
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
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 120 }}
      ListHeaderComponent={
        <View style={styles.container}>
          {/* LOGO */}
          <Image
            source={require("../../assets/images/carot.png")}
            style={styles.logo}
          />

          {/* LOCATION */}
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="#FF4D4D" />
            <View>
              <Text style={styles.city}>Dhaka</Text>
              <Text style={styles.address}>Banassre</Text>
            </View>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBox}>
            <TextInput placeholder="Search Store" style={styles.searchInput} />
          </View>

          {/* BANNER */}
          <ImageBackground
            source={require("../../assets/images/fresh-vegetable.png")}
            style={styles.banner}
            imageStyle={{ borderRadius: 15 }}
          />

          {/* EXCLUSIVE */}
          <View style={styles.row}>
            <Text style={styles.section}>Exclusive Offer</Text>
          </View>

          <FlatList
            data={exclusiveProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
          />

          {/* BEST SELLING */}
          <View style={styles.row}>
            <Text style={styles.section}>Best Selling</Text>
          </View>

          <FlatList
            data={bestSelling}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
          />

          {/* GROCERIES */}
          <View style={styles.row}>
            <Text style={styles.section}>Groceries</Text>
          </View>

          <FlatList
            data={groceries}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderGrocery}
            keyExtractor={(item) => item.id}
          />

          {/* MEAT */}
          <View style={styles.row}>
            <Text style={styles.section}>Meat</Text>
          </View>

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
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },

  logo: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginBottom: 15,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  city: {
    fontSize: 18,
    fontWeight: "bold",
  },

  address: {
    fontSize: 13,
    color: "#777",
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

  row: {
    marginTop: 10,
    marginBottom: 10,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
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