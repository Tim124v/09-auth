import axios from "axios";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";

export const clientApi = axios.create({
  baseURL,
  withCredentials: true,
});

export async function login(email: string, password: string) {
  const response = await clientApi.post("/api/auth/login", { email, password });
  return response.data;
}

export async function logout() {
  await clientApi.post("/api/auth/logout");
}

export async function getSession() {
  const response = await clientApi.get("/api/auth/session");
  return response.data;
}

export async function register(email: string, password: string) {
  const response = await clientApi.post("/api/auth/register", { email, password });
  return response.data;
} 