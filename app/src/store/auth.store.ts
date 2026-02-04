import { create } from "zustand";
import { saveToken, clearToken } from "../utils/storage";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

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
