/**
 * simpleStorage.js
 * Storage: SecureStore (persistent) > AsyncStorage (fallback)
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const storage = {
  async setItem(key, value) {
    if (isWeb) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        // Fallback silently
      }
      return;
    }

    // Try SecureStore first (persistent on iOS)
    try {
      await SecureStore.setItemAsync(key, value);
      return;
    } catch (error) {
      // Fallback silently to AsyncStorage
    }

    // Fallback AsyncStorage
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Silent fail
    }
  },

  async getItem(key) {
    if (isWeb) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }

    // Try SecureStore first
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value) return value;
    } catch (error) {
      // Fallback silently to AsyncStorage
    }

    // Fallback AsyncStorage
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },

  async removeItem(key) {
    if (isWeb) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        //
      }
      return;
    }

    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      //
    }

    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      //
    }
  },

  async multiRemove(keys) {
    if (isWeb) {
      try {
        keys.forEach((key) => localStorage.removeItem(key));
      } catch (error) {
        //
      }
      return;
    }

    try {
      await Promise.all(keys.map((k) => SecureStore.deleteItemAsync(k)));
    } catch (error) {
      //
    }

    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      //
    }
  },
};

export default storage;
