/**
 * auth-context.js
 * Context xác thực người dùng với AsyncStorage
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { clearAll, getAccounts, getUser, saveAccount, saveUser } from "../services/storageService";

// Tài khoản demo (thực tế sẽ gọi API)
const DEMO_ACCOUNTS = [
  { email: "user@nectar.com", password: "123456", name: "Triệu Bảo Khanh", mssv: "23810310013" },
  { email: "admin@nectar.com", password: "admin123", name: "Admin Nectar", mssv: "00000000000" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const appState = useRef(AppState.currentState);

  /* ====== AUTO-LOGIN khi app khởi động ====== */
  useEffect(() => {
    (async () => {
      try {
        const savedUser = await getUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        // Silent error
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  /* ====== LISTEN APP STATE (Resume từ background) ====== */
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      // Nếu app từ background → foreground
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // Refresh user session khi app resume
        (async () => {
          try {
            const savedUser = await getUser();
            if (savedUser) {
              setUser(savedUser);
            }
          } catch (error) {
            // Silent error
          }
        })();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  /* ====== LOGIN ====== */
  const login = useCallback(async (identifier, password) => {
    try {
      const credential = identifier.trim().toLowerCase();
      const storedAccounts = await getAccounts();
      const allAccounts = [...DEMO_ACCOUNTS, ...storedAccounts];
      const found = allAccounts.find((acc) => {
        const emailMatch = acc.email.toLowerCase() === credential;
        const nameMatch = acc.name.toLowerCase().includes(credential);
        return (emailMatch || nameMatch) && acc.password === password.trim();
      });

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
      return { success: false, message: "Đã có lỗi xảy ra" };
    }
  }, []);

  /* ====== SIGNUP + AUTO-LOGIN ====== */
  const signup = useCallback(async (name, email, password) => {
    try {
      // Kiểm tra email đã tồn tại?
      const storedAccounts = await getAccounts();
      const allAccounts = [...DEMO_ACCOUNTS, ...storedAccounts];
      const emailExists = allAccounts.some(
        (acc) => acc.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        return { success: false, message: "Email này đã được đăng ký" };
      }

      // Tạo account mới
      const newAccount = {
        name,
        email: email.toLowerCase(),
        password,
        mssv: "00000000000",
        createdAt: new Date().toISOString(),
      };

      // Lưu account vào storage
      const saveSuccess = await saveAccount(newAccount);
      if (!saveSuccess) {
        return { success: false, message: "Không thể tạo tài khoản" };
      }

      // Tự động login
      const userData = {
        email: newAccount.email,
        name: newAccount.name,
        mssv: newAccount.mssv,
        loginAt: new Date().toISOString(),
      };

      await saveUser(userData);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: "Đã có lỗi xảy ra" };
    }
  }, []);

  /* ====== LOGOUT ====== */
  const logout = useCallback(async () => {
    try {
      await clearAll();
      setUser(null);
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
