import { create } from "zustand";
import {
  clearGroups,
  clearToken,
  clearUser,
  getGroups,
  getToken,
  getUser,
  saveGroups,
  saveToken,
  saveUser,
} from "../utils/storage";

interface AuthState {
  user: any | null;
  token: string | null;
  groups: any;
  isAuthenticated: boolean;
  hydrateAuth: () => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  groups: [],

  hydrateAuth: async () => {
    const token = await getToken();
    const groups = await getGroups();
    const user = await getUser();


    if (token) {
      set({
        token,
        isAuthenticated: true,
        user: user || null,
        groups: groups || [],
      });
    }
  },

  login: async (data) => {
    await saveToken(data.ChatToken);

    const normalizedGroups = data.Groups.map((g: any[]) => ({
      name: g[0],
      groupLastMessage: g[1],
      lastMessageTime: g[2],
      isActive: g[3],
      isAdmin: g[4],
      inviteStatus: g[5],
      isTwoWay: g[6],
      isOneToOne: g[7],
      personalChatName: g[8],
    }));

    // console.log("NORMALIZED GROUPS --->", normalizedGroups);

    await saveGroups(normalizedGroups);
    await saveUser(data);

    set({
      user: data,
      token: data.ChatToken,
      isAuthenticated: true,
      groups: normalizedGroups,
    });
  },

  logout: async () => {
    await clearToken();
    await clearGroups();
    await clearUser();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
