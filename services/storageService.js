/**
 * storageService.js
 * Tập trung logic đọc/ghi AsyncStorage cho NectarApp
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  USER: "@nectar_user",
  CART: "@nectar_cart",
  ORDERS: "@nectar_orders",
};

/* ===================== USER ===================== */

/**
 * Lưu thông tin người dùng sau khi đăng nhập
 */
export async function saveUser(user) {
  try {
    const json = JSON.stringify(user);
    await AsyncStorage.setItem(KEYS.USER, json);
  } catch (error) {
    console.error("[storageService] saveUser error:", error);
  }
}

/**
 * Lấy thông tin người dùng (auto-login)
 */
export async function getUser() {
  try {
    const json = await AsyncStorage.getItem(KEYS.USER);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.error("[storageService] getUser error:", error);
    return null;
  }
}

/**
 * Xóa thông tin người dùng (logout)
 */
export async function clearUser() {
  try {
    await AsyncStorage.removeItem(KEYS.USER);
  } catch (error) {
    console.error("[storageService] clearUser error:", error);
  }
}

/* ===================== CART ===================== */

/**
 * Lưu giỏ hàng (chỉ lưu các trường serializable, bỏ image resource)
 */
export async function saveCart(cart) {
  try {
    // Bỏ field image vì require() không serializable
    const serializable = cart.map(({ image, ...rest }) => rest);
    const json = JSON.stringify(serializable);
    await AsyncStorage.setItem(KEYS.CART, json);
  } catch (error) {
    console.error("[storageService] saveCart error:", error);
  }
}

/**
 * Lấy giỏ hàng đã lưu
 */
export async function getCart() {
  try {
    const json = await AsyncStorage.getItem(KEYS.CART);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.error("[storageService] getCart error:", error);
    return null;
  }
}

/* ===================== ORDERS ===================== */

/**
 * Lưu danh sách đơn hàng
 */
export async function saveOrders(orders) {
  try {
    const json = JSON.stringify(orders);
    await AsyncStorage.setItem(KEYS.ORDERS, json);
  } catch (error) {
    console.error("[storageService] saveOrders error:", error);
  }
}

/**
 * Lấy danh sách đơn hàng
 */
export async function getOrders() {
  try {
    const json = await AsyncStorage.getItem(KEYS.ORDERS);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    console.error("[storageService] getOrders error:", error);
    return [];
  }
}

/**
 * Xóa toàn bộ dữ liệu (dùng khi logout hoặc debug)
 */
export async function clearAll() {
  try {
    await AsyncStorage.multiRemove([KEYS.USER, KEYS.CART, KEYS.ORDERS]);
  } catch (error) {
    console.error("[storageService] clearAll error:", error);
  }
}
