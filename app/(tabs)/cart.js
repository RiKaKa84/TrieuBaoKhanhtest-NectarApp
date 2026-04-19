import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCart } from "../_context/cart-context";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CartScreen() {
  const { cart, increase, decrease, removeItem } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.unit}>{item.unit}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decrease(item.id)}
          >
            <Ionicons name="remove" size={18} color="#999" />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => increase(item.id)}
          >
            <Ionicons name="add" size={18} color="#53B175" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Ionicons name="close" size={18} color="#999" />
        </TouchableOpacity>

        <Text style={styles.price}>
          ${(item.price * item.qty).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>My Cart</Text>
<View style={styles.topDivider} />
      {/* LIST */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* CHECKOUT */}
      <View style={styles.bottomDivider} />
      <TouchableOpacity style={styles.checkout}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 40,
  },

  image: {
    width: 65,
    height: 65,
    marginRight: 12,
    resizeMode: "contain",
  },

  name: {
    fontWeight: "600",
    fontSize: 15,
  },

  unit: {
    color: "#999",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  qty: {
    marginHorizontal: 14,
    fontWeight: "600",
    fontSize: 15,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 70,
  },

  price: {
    fontWeight: "600",
    fontSize: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
topDivider: {
  height: 1,
  backgroundColor: "#E5E5E5",
  marginTop: 10,
  marginBottom: 10,
},

bottomDivider: {
  height: 1,
  backgroundColor: "#E5E5E5",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 90, // 👈 nằm ngay trên nút checkout
  marginBottom: 10
},
  checkout: {
    backgroundColor: "#53B175",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  total: {
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
});