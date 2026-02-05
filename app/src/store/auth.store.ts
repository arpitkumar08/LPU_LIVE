import { create } from "zustand";
import { saveToken, clearToken, getToken } from "../utils/storage";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrateAuth: () => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  hydrateAuth: async () => {
    const token = await getToken();

    if (token) {
      set({
        token,
        isAuthenticated: true,
      });
    }
  },

  login: async (data) => {
    await saveToken(data.ChatToken);

    set({
      user: data,
      token: data.ChatToken,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await clearToken();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
