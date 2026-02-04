import { api } from "../api/api"

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/appauth", {
    username: username,
    password: password,
  });

  if (!response.data?.ChatToken) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return response.data;
};
