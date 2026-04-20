/**
 * cart-context.js
 * Context giỏ hàng + orders với AsyncStorage persistence
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCart, getFavorites, getOrders, saveCart, saveFavorites, saveOrders } from "../services/storageService";

// Image map để khôi phục ảnh khi load từ storage
const IMAGE_MAP = {
  "1": require("@/assets/images/otchuong.png"),
  "2": require("@/assets/images/egg-red-basket.png"),
  "3": require("@/assets/images/banana.png"),
  "4": require("@/assets/images/rau.png"),
  // Sản phẩm từ homescreen
  "h1": require("@/assets/images/banana.png"),
  "h2": require("@/assets/images/apple.png"),
  "h3": require("@/assets/images/otchuong.png"),
  "h4": require("@/assets/images/rau.png"),
  "h5": require("@/assets/images/pulses.png"),
  "h6": require("@/assets/images/rice.png"),
  "h7": require("@/assets/images/thitbo.png"),
  "h8": require("@/assets/images/thitga.png"),
  // Các sản phẩm từ danh sách Favorite cũ
  "b1": require("@/assets/images/diet-coke.png"),
  "b2": require("@/assets/images/sprite-can.png"),
  "b3": require("@/assets/images/apple-and-grape-juice.png"),
  "b4": require("@/assets/images/orange-juice.png"),
  "b5": require("@/assets/images/cocacola.png"),
  "b6": require("@/assets/images/pepsi.png"),
};

const CartContext = createContext(null);

const parsePrice = (value) => {
  if (typeof value === "number") return value;
  const parsed = parseFloat(value?.toString()?.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedCart = await getCart();
        if (savedCart && savedCart.length > 0) {
          const restored = savedCart.map((item) => ({
            ...item,
            image: IMAGE_MAP[item.id] ?? require("@/assets/images/apple.png"),
          }));
          setCart(restored);
        }

        const savedOrders = await getOrders();
        if (savedOrders) {
          setOrders(savedOrders);
        }

        const savedFavorites = await getFavorites();
        if (savedFavorites) {
          // Khôi phục ảnh cho favorites
          const restoredFavs = savedFavorites.map(item => ({
            ...item,
            image: IMAGE_MAP[item.id] ?? require("@/assets/images/apple.png")
          }));
          setFavorites(restoredFavs);
        }
      } catch (error) {
        console.error("[CartContext] load error:", error);
      } finally {
        setIsCartLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isCartLoading) {
      saveCart(cart);
    }
  }, [cart, isCartLoading]);

  useEffect(() => {
    if (!isCartLoading) {
      saveFavorites(favorites);
    }
  }, [favorites, isCartLoading]);

  const increase = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }, []);

  const decrease = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: product.qty ?? 1 }];
    });
  }, []);

  const addAllToCart = useCallback((items) => {
    setCart((prevCart) => {
      let nextCart = [...prevCart];
      items.forEach((item) => {
        const itemId = item.id;
        const itemPrice = parsePrice(item.price);
        const unitLabel = item.unit ?? item.description ?? "1kg, Price";
        const existingIndex = nextCart.findIndex((c) => c.id === itemId);

        if (existingIndex >= 0) {
          nextCart = nextCart.map((c) =>
            c.id === itemId ? { ...c, qty: c.qty + 1 } : c
          );
        } else {
          nextCart.push({
            id: itemId,
            name: item.name,
            price: itemPrice,
            unit: unitLabel,
            image: item.image,
            qty: item.qty ?? 1,
          });
        }
      });
      return nextCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const checkout = useCallback(async () => {
    try {
      if (cart.length === 0) return { success: false, message: "Giỏ hàng trống" };

      const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);

      const newOrder = {
        id: Date.now().toString(),
        items: cart.map(({ image, ...rest }) => rest),
        total: total.toFixed(2),
        createdAt: new Date().toISOString(),
        status: "Đã đặt hàng",
      };

      const updatedOrders = [newOrder, ...orders];
      await saveOrders(updatedOrders);
      setOrders(updatedOrders);
      setCart([]);
      return { success: true, order: newOrder };
    } catch (error) {
      console.error("[CartContext] checkout error:", error);
      return { success: false, message: "Lỗi khi đặt hàng" };
    }
  }, [cart, orders]);

  /* ================= FAVORITES ACTIONS ================= */

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback((id) => {
    return favorites.some((item) => item.id === id);
  }, [favorites]);

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        favorites,
        isCartLoading,
        increase,
        decrease,
        removeItem,
        addToCart,
        addAllToCart,
        clearCart,
        checkout,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
