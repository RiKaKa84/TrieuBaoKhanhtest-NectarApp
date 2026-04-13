import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const data = [
  {
    id: "1",
    name: "Diet Coke",
    volume: "355ml",
    price: "$1.99",
    image: require("@/assets/images/diet-coke.png"),
  },
  {
    id: "2",
    name: "Sprite Can",
    volume: "325ml",
    price: "$1.50",
    image: require("@/assets/images/sprite-can.png"),
  },
  {
    id: "3",
    name: "Apple & Grape Juice",
    volume: "2L",
    price: "$15.99",
    image: require("@/assets/images/apple-and-grape-juice.png"),
  },
  {
    id: "4",
    name: "Orange Juice",
    volume: "2L",
    price: "$15.99",
    image: require("@/assets/images/orange-juice.png"),
  },
  {
    id: "5",
    name: "Coca Cola Can",
    volume: "325ml",
    price: "$4.99",
    image: require("@/assets/images/cocacola.png"),
  },
  {
    id: "6",
    name: "Pepsi Can",
    volume: "330ml",
    price: "$4.99",
    image: require("@/assets/images/pepsi.png"),
  },
];

export default function BeveragesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.title}>Beverages</Text>

        <Ionicons name="options-outline" size={22} />
      </View>

      {/* LIST */}
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* IMAGE */}
            <View style={styles.imageBox}>
              <Image
                source={item.image}
                style={styles.image}
                contentFit="contain"
              />
            </View>

            {/* INFO */}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>{item.volume}, Price</Text>

            {/* PRICE + BUTTON */}
            <View style={styles.bottom}>
              <Text style={styles.price}>{item.price}</Text>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 18,
    padding: 12,
    alignItems: "center",

    // shadow đẹp
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  imageBox: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  name: {
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },

  sub: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },

  bottom: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  price: {
    fontWeight: "bold",
    fontSize: 14,
  },

  btn: {
    backgroundColor: "#4CAF50",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});