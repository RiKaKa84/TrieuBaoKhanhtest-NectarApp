/**
 * useStorage.js - Custom Hook
 * Đơn giản hóa việc đọc/ghi AsyncStorage
 * Sinh viên: Triệu Bảo Khanh - MSSV: 23810310013
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

/**
 * @param {string} key - AsyncStorage key
 * @param {any} initialValue - Giá trị mặc định
 */
export function useStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  // Đọc từ storage khi mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(key);
        if (json != null) {
          setStoredValue(JSON.parse(json));
        }
      } catch (error) {
        console.error(`[useStorage] read "${key}" error:`, error);
      } finally {
        setLoading(false);
      }
    })();
  }, [key]);

  // Lưu giá trị
  const setValue = useCallback(
    async (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`[useStorage] write "${key}" error:`, error);
      }
    },
    [key, storedValue]
  );

  // Xóa key
  const removeValue = useCallback(async () => {
    try {
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[useStorage] remove "${key}" error:`, error);
    }
  }, [key, initialValue]);

  return { storedValue, setValue, removeValue, loading };
}
