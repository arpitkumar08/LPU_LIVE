import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "chat_token";
const GROUPS_KEY = "chat_groups";
const USER_KEY = "chat_user";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const clearToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const saveGroups = async (groups: any) => {
  await AsyncStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
};

export const getGroups = async () => {
  const groups = await AsyncStorage.getItem(GROUPS_KEY);
  return groups ? JSON.parse(groups) : null;
};

export const clearGroups = async () => {
  await AsyncStorage.removeItem(GROUPS_KEY);
};

export const saveUser = async (user: any) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
