/**
 * productDetail.js - Chi tiết sản phẩm với thêm vào giỏ
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "./_context/cart-context";

/* fallback image nếu không có param */
import apple from "../assets/images/apple.png";

function showToast(message) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Thành công", message);
  }
}

export default function ProductDetail() {
  const { name, price } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [qty, setQty] = useState(1);
  const unitPrice = parseFloat((price || "$4.99").replace(/[^0-9.]/g, "")) || 4.99;
  const totalPrice = `$${(unitPrice * qty).toFixed(2)}`;

  const handleAddToBasket = () => {
    addToCart({
      id: `detail-${Date.now()}`,
      name: name || "Naturel Red Apple",
      price: unitPrice,
      unit: "1kg, Price",
      image: apple,
      qty: qty,
    });
    showToast(`${name || "Sản phẩm"} đã thêm vào giỏ hàng!`);
  };

  return (
    <View style={styles.container}>
      {/* BACK */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Quay lại</Text>
      </TouchableOpacity>

      {/* IMAGE */}
      <View style={styles.imageBox}>
        <Image source={apple} style={styles.image} />
      </View>

      {/* NAME + HEART */}
      <View style={styles.nameRow}>
        <View>
          <Text style={styles.name}>
            {name || "Naturel Red Apple"}
          </Text>
          <Text style={styles.sub}>1kg, Price</Text>
        </View>
        <Text style={styles.heart}>♡</Text>
      </View>

      {/* QTY + PRICE */}
      <View style={styles.row}>
        <View style={styles.qtyBox}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(qty > 1 ? qty - 1 : 1)}
          >
            <Text style={styles.minus}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(qty + 1)}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>{totalPrice}</Text>
      </View>

      {/* PRODUCT DETAIL */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Product Detail</Text>
        <Text style={styles.arrow}>˅</Text>
      </View>

      <Text style={styles.desc}>
        Apples are nutritious. Apples may be good for weight loss. Apples may
        be good for your heart. As part of a healthful and varied diet.
      </Text>

      {/* NUTRITIONS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Nutritions</Text>
        <View style={styles.rightRow}>
          <View style={styles.nutriBox}>
            <Text style={styles.nutriText}>100g</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>

      {/* REVIEW */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Review</Text>
        <View style={styles.rightRow}>
          <Text style={styles.review}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.cartBtn} onPress={handleAddToBasket}>
        <Text style={styles.cartText}>Add To Basket</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  backBtn: {
    marginBottom: 10,
  },

  backText: {
    color: "#53B175",
    fontSize: 15,
    fontWeight: "500",
  },

  imageBox: {
    backgroundColor: "#F2F3F2",
    borderRadius: 25,
    alignItems: "center",
    padding: 30,
    marginBottom: 20,
  },

  image: {
    width: 230,
    height: 230,
    resizeMode: "contain",
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  sub: {
    color: "#7C7C7C",
    marginTop: 5,
  },

  heart: {
    fontSize: 22,
    color: "#999",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  qtyBtn: {
    paddingHorizontal: 10,
  },

  minus: {
    fontSize: 20,
    color: "#B3B3B3",
  },

  plus: {
    fontSize: 20,
    color: "#53B175",
  },

  qty: {
    fontSize: 16,
    marginHorizontal: 10,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sectionHeader: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  arrow: {
    fontSize: 18,
    color: "#999",
  },

  desc: {
    color: "#7C7C7C",
    lineHeight: 20,
    marginTop: 5,
  },

  rightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  nutriBox: {
    backgroundColor: "#EBF9F1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  nutriText: {
    color: "#53B175",
    fontWeight: "bold",
  },

  review: {
    fontSize: 16,
    color: "#F4B400",
  },

  cartBtn: {
    backgroundColor: "#53B175",
    padding: 18,
    borderRadius: 20,
    marginTop: 30,
    alignItems: "center",
  },

  cartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});