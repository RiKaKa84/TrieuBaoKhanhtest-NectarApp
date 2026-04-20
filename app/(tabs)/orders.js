/**
 * orders.js - Màn hình danh sách đơn hàng
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../_context/cart-context";

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

function OrderCard({ order }) {
  return (
    <View style={styles.card}>
      {/* Header đơn hàng */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>Đơn #{order.id.slice(-8)}</Text>
          <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Danh sách sản phẩm */}
      {order.items.map((item, index) => (
        <View key={`${order.id}-${index}`} style={styles.itemRow}>
          <View style={styles.itemDot} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQty}>x{item.qty}</Text>
          <Text style={styles.itemPrice}>
            ${((parseFloat(item.price) || 0) * item.qty).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />

      {/* Tổng tiền */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tổng cộng</Text>
        <Text style={styles.totalAmount}>${order.total}</Text>
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const { orders, isCartLoading } = useCart();

  if (isCartLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
        <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#ddd" />
          <Text style={styles.emptyText}>Chưa có đơn hàng</Text>
          <Text style={styles.emptySubText}>Hãy mua sắm và đặt hàng</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderCard order={item} />}
          contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    gap: 12,
  },

  loadingText: {
    color: "#53B175",
    fontSize: 14,
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 12,
    color: "#1D1D1D",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#aaa",
  },

  emptySubText: {
    color: "#bbb",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  orderId: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1D1D1D",
  },

  orderDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },

  statusBadge: {
    backgroundColor: "#EBF9F1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#53B175",
    fontSize: 12,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },

  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#53B175",
  },

  itemName: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  itemQty: {
    color: "#888",
    fontSize: 13,
    width: 30,
    textAlign: "right",
  },

  itemPrice: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1D1D1D",
    width: 60,
    textAlign: "right",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontWeight: "600",
    color: "#555",
    fontSize: 14,
  },

  totalAmount: {
    fontWeight: "700",
    color: "#53B175",
    fontSize: 18,
  },
});
