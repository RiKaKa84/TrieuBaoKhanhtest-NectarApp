/**
 * storageService.js
 * Tập trung logic đọc/ghi AsyncStorage cho NectarApp
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import storage from "./simpleStorage";

const KEYS = {
  USER: "@nectar_user",
  ACCOUNTS: "@nectar_accounts",
  CART: "@nectar_cart",
  ORDERS: "@nectar_orders",
  FAVORITES: "@nectar_favorites",
};

/* ===================== USER ===================== */

/**
 * Lưu thông tin người dùng sau khi đăng nhập
 */
export async function saveUser(user) {
  try {
    const json = JSON.stringify(user);
    await storage.setItem(KEYS.USER, json);
  } catch (error) {
    // Silent error
  }
}

/**
 * Lấy thông tin người dùng (auto-login)
 */
export async function getUser() {
  try {
    const json = await storage.getItem(KEYS.USER);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    return null;
  }
}

/**
 * Lưu tài khoản đăng ký mới vào bộ nhớ
 */
export async function saveAccount(account) {
  try {
    const accounts = await getAccounts();
    const exists = accounts.some(
      (item) => item.email.toLowerCase() === account.email.toLowerCase()
    );
    if (exists) {
      return false;
    }
    accounts.push(account);
    const json = JSON.stringify(accounts);
    await storage.setItem(KEYS.ACCOUNTS, json);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getAccounts() {
  try {
    const json = await storage.getItem(KEYS.ACCOUNTS);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    return [];
  }
}

/**
 * Xóa thông tin người dùng (logout)
 */
export async function clearUser() {
  try {
    await storage.removeItem(KEYS.USER);
  } catch (error) {
    // Silent error
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
    await storage.setItem(KEYS.CART, json);
  } catch (error) {
    // Silent error
  }
}

/**
 * Lấy giỏ hàng đã lưu
 */
export async function getCart() {
  try {
    const json = await storage.getItem(KEYS.CART);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
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
    await storage.setItem(KEYS.ORDERS, json);
  } catch (error) {
    // Silent error
  }
}

/**
 * Lấy danh sách đơn hàng
 */
export async function getOrders() {
  try {
    const json = await storage.getItem(KEYS.ORDERS);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    return [];
  }
}

/* ===================== FAVORITES ===================== */

/**
 * Lưu danh sách sản phẩm yêu thích
 */
export async function saveFavorites(favorites) {
  try {
    const json = JSON.stringify(favorites);
    await storage.setItem(KEYS.FAVORITES, json);
  } catch (error) {
    // Silent error
  }
}

/**
 * Lấy danh sách sản phẩm yêu thích
 */
export async function getFavorites() {
  try {
    const json = await storage.getItem(KEYS.FAVORITES);
    return json != null ? JSON.parse(json) : [];
  } catch (error) {
    return [];
  }
}

/**
 * Xóa toàn bộ dữ liệu (dùng khi logout hoặc debug)
 */
export async function clearAll() {
  try {
    await storage.multiRemove([KEYS.USER, KEYS.CART, KEYS.ORDERS, KEYS.FAVORITES]);
  } catch (error) {
    // Silent error
  }
}
