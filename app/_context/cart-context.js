import { createContext, useContext, useState } from "react";

const INITIAL_CART = [
  {
    id: "1",
    name: "Bell Pepper Red",
    price: 4.99,
    unit: "1kg, Price",
    image: require("@/assets/images/otchuong.png"),
    qty: 1,
  },
  {
    id: "2",
    name: "Egg Chicken Red",
    price: 1.99,
    unit: "4pcs, Price",
    image: require("@/assets/images/egg-red-basket.png"),
    qty: 1,
  },
  {
    id: "3",
    name: "Organic Bananas",
    price: 3.0,
    unit: "12kg, Price",
    image: require("@/assets/images/banana.png"),
    qty: 1,
  },
  {
    id: "4",
    name: "Ginger",
    price: 2.99,
    unit: "250gm, Price",
    image: require("@/assets/images/rau.png"),
    qty: 1,
  },
];

const CartContext = createContext(null);

const parsePrice = (value) => {
  if (typeof value === "number") return value;
  const parsed = parseFloat(value?.toString()?.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(INITIAL_CART);

  const increase = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addAllToCart = (items) => {
    setCart((prevCart) => {
      let nextCart = [...prevCart];

      items.forEach((item) => {
        const itemId = item.id;
        const itemPrice = parsePrice(item.price);
        const unitLabel = item.unit ?? item.description ?? "1kg, Price";
        const existingIndex = nextCart.findIndex(
          (cartItem) => cartItem.id === itemId
        );

        if (existingIndex >= 0) {
          nextCart = nextCart.map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, qty: cartItem.qty + 1 }
              : cartItem
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
  };

  return (
    <CartContext.Provider
      value={{ cart, increase, decrease, removeItem, addAllToCart }}
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
