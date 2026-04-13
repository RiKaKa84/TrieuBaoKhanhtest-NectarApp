import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import apple from "../assets/images/apple.png";

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [showImage, setShowImage] = useState(false);

  return (
    <View style={styles.container}>
      
      {/* IMAGE */}
      <View style={styles.imageBox}>
        <TouchableOpacity onPress={() => setShowImage(true)}>
          <Image source={apple} style={styles.image} />
        </TouchableOpacity>
      </View>

      {/* NAME + HEART */}
      <View style={styles.nameRow}>
        <View>
          <Text style={styles.name}>Naturel Red Apple</Text>
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

        <Text style={styles.price}>$4.99</Text>
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={styles.nutriBox}>
            <Text style={styles.nutriText}>100g</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>

      {/* REVIEW */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Review</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={styles.review}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.cartBtn}>
        <Text style={styles.cartText}>Add To Basket</Text>
      </TouchableOpacity>

      {/* MODAL ZOOM IMAGE */}
      <Modal visible={showImage} transparent={true}>
        <Pressable
          style={styles.modalBg}
          onPress={() => setShowImage(false)}
        >
          <Image source={apple} style={styles.fullImage} />
        </Pressable>
      </Modal>

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

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "90%",
    height: 300,
    resizeMode: "contain",
  },
});