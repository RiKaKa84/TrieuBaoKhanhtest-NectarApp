/**
 * productDetail.js - Chi tiết sản phẩm với thêm vào giỏ
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProductById } from "../constants/products";
import { useCart } from "../contexts/cart-context";

const screenWidth = Dimensions.get("window").width;

function showToast(message) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Success", message);
  }
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, toggleFavorite, isFavorite: checkFavorite } = useCart();

  const product = getProductById(id);
  const [qty, setQty] = useState(1);
  const isFavorite = checkFavorite(product?.id);
  const [expandedSection, setExpandedSection] = useState(null);

  const unitPrice = product.price || 4.99;
  const totalPrice = `$${(unitPrice * qty).toFixed(2)}`;

  const handleAddToBasket = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: unitPrice,
      unit: product.unit,
      image: product.image,
      qty: qty,
    });
    showToast(`${product.name} đã thêm vào giỏ hàng!`);
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  if (!product) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => toggleFavorite(product)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#53B175" : "#7C7C7C"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGE */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} contentFit="contain" />
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.unit}>{product.unit}</Text>
        </View>

        {/* QTY + PRICE ROW */}
        <View style={styles.qtyPriceRow}>
          <View style={styles.qtyBox}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              <Ionicons name="remove" size={24} color={qty > 1 ? "#53B175" : "#B1B1B1"} />
            </TouchableOpacity>

            <View style={styles.qtyValueBox}>
              <Text style={styles.qty}>{qty}</Text>
            </View>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(qty + 1)}
            >
              <Ionicons name="add" size={24} color="#53B175" />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>{totalPrice}</Text>
        </View>

        <View style={styles.divider} />

        {/* ACCORDION SECTIONS */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === "detail" ? null : "detail")}
        >
          <Text style={styles.sectionTitle}>Product Detail</Text>
          <Ionicons name={expandedSection === "detail" ? "chevron-up" : "chevron-down"} size={20} color="#181725" />
        </TouchableOpacity>
        {expandedSection === "detail" && (
          <Text style={styles.description}>{product.description}</Text>
        )}

        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === "nutrition" ? null : "nutrition")}
        >
          <Text style={styles.sectionTitle}>Nutritions</Text>
          <View style={styles.sectionRight}>
            <View style={styles.nutriBadge}>
              <Text style={styles.nutriText}>{product.nutrition}</Text>
            </View>
            <Ionicons name={expandedSection === "nutrition" ? "chevron-up" : "chevron-down"} size={20} color="#181725" />
          </View>
        </TouchableOpacity>
        {expandedSection === "nutrition" && (
          <View style={styles.nutritionContent}>
            <Text style={styles.nutritionText}>Organic & Natural energy source.</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === "review" ? null : "review")}
        >
          <Text style={styles.sectionTitle}>Review</Text>
          <View style={styles.sectionRight}>
            <Text style={styles.stars}>{renderStars(product.rating)}</Text>
            <Ionicons name={expandedSection === "review" ? "chevron-up" : "chevron-down"} size={20} color="#181725" />
          </View>
        </TouchableOpacity>
        {expandedSection === "review" && (
          <View style={styles.reviewContent}>
            <Text style={styles.reviewText}>Fresh and tasty quality!</Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* FOOTER BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToBasket}>
          <Text style={styles.addCartText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


/* ================= STYLE ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },

  headerBtn: {
    padding: 8,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  imageBox: {
    backgroundColor: "#F2F3F2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    marginBottom: 16,
  },

  image: {
    width: 200,
    height: 200,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e8e8e8",
  },

  activeDot: {
    backgroundColor: "#53B175",
    width: 24,
  },

  infoSection: {
    marginBottom: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },

  unit: {
    fontSize: 14,
    color: "#999",
  },

  qtyPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    padding: 10,
  },

  qtyValueBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  qty: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181725",
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#181725",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E2E2",
    marginVertical: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
  },

  sectionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  nutriBadge: {
    backgroundColor: "#EBF9F1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },

  nutriText: {
    color: "#7C7C7C",
    fontWeight: "600",
    fontSize: 12,
  },

  description: {
    fontSize: 13,
    color: "#7C7C7C",
    lineHeight: 21,
    paddingVertical: 12,
  },

  nutritionContent: {
    paddingVertical: 12,
  },

  nutritionText: {
    fontSize: 13,
    color: "#7C7C7C",
    paddingVertical: 4,
  },

  stars: {
    fontSize: 16,
  },

  reviewContent: {
    paddingVertical: 12,
  },

  reviewText: {
    fontSize: 13,
    color: "#7C7C7C",
    lineHeight: 21,
  },

  bottomPadding: {
    height: 100,
  },

  footer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
    paddingTop: 15,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  addCartBtn: {
    backgroundColor: "#53B175",
    height: 67,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  addCartText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 18,
  },
});