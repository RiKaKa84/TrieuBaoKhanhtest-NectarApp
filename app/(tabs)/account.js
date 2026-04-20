/**
 * account.js - Màn hình tài khoản với logout
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../_context/auth-context";

export default function Account() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc muốn đăng xuất không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Account</Text>

      {/* Thẻ thông tin sinh viên */}
      <View style={styles.studentCard}>
        <Text style={styles.studentLabel}>Sinh viên thực hiện</Text>
        <Text style={styles.studentName}>Triệu Bảo Khanh</Text>
        <Text style={styles.studentMSSV}>MSSV: 23810310013</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Ionicons name="person" size={48} color="#53B175" />
      </View>

      {/* Thông tin người dùng */}
      {user ? (
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#53B175" />
            <Text style={styles.infoText}>{user.name}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#53B175" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="id-card-outline" size={20} color="#53B175" />
            <Text style={styles.infoText}>MSSV: {user.mssv}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#53B175" />
            <Text style={styles.infoText}>
              Đăng nhập: {new Date(user.loginAt).toLocaleString("vi-VN")}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noUser}>Chưa đăng nhập</Text>
      )}

      {/* Menu items */}
      <View style={styles.menu}>
        {[
          { icon: "bag-outline", title: "Orders" },
          { icon: "heart-outline", title: "Favorites" },
          { icon: "location-outline", title: "Delivery Address" },
          { icon: "card-outline", title: "Payment Methods" },
        ].map((item) => (
          <TouchableOpacity key={item.title} style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon} size={22} color="#555" />
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
    color: "#1D1D1D",
  },

  studentCard: {
    backgroundColor: "#EBF9F1",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#53B175",
  },

  studentLabel: {
    color: "#53B175",
    fontSize: 12,
    fontWeight: "600",
  },

  studentName: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1D1D1D",
  },

  studentMSSV: {
    color: "#555",
    fontSize: 12,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EBF9F1",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },

  infoText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },

  noUser: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: 20,
  },

  menu: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuTitle: {
    fontSize: 15,
    color: "#333",
  },

  logoutBtn: {
    backgroundColor: "#FF4B4B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});