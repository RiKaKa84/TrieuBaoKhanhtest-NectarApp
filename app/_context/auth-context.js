/**
 * auth-context.js
 * Context xác thực người dùng với AsyncStorage
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { router } from "expo-router";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { clearUser, getUser, saveUser } from "../../services/storageService";

// Tài khoản demo (thực tế sẽ gọi API)
const DEMO_ACCOUNTS = [
  { email: "user@nectar.com", password: "123456", name: "Triệu Bảo Khanh", mssv: "23810310013" },
  { email: "admin@nectar.com", password: "admin123", name: "Admin Nectar", mssv: "00000000000" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // đang kiểm tra auto-login

  /* ====== AUTO-LOGIN khi app khởi động ====== */
  useEffect(() => {
    (async () => {
      try {
        const savedUser = await getUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error("[AuthContext] autoLogin error:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  /* ====== LOGIN ====== */
  const login = useCallback(async (email, password) => {
    try {
      // Tìm tài khoản khớp (demo)
      const found = DEMO_ACCOUNTS.find(
        (acc) =>
          acc.email.toLowerCase() === email.toLowerCase() &&
          acc.password === password
      );

      if (!found) {
        return { success: false, message: "Email hoặc mật khẩu không đúng" };
      }

      const userData = {
        email: found.email,
        name: found.name,
        mssv: found.mssv,
        loginAt: new Date().toISOString(),
      };

      await saveUser(userData);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("[AuthContext] login error:", error);
      return { success: false, message: "Đã có lỗi xảy ra" };
    }
  }, []);

  /* ====== LOGOUT ====== */
  const logout = useCallback(async () => {
    try {
      await clearUser();
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error("[AuthContext] logout error:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
