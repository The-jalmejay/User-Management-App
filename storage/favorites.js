import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_KEY = "FAV_USERS";

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = async (list) => {
  try {
    await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(list));
  } catch {}
};
