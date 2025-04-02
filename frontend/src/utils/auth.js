// src/utils/auth.js
import  { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000; // in seconds
    return exp > now; // true if not expired
  } catch {
    return false; // token is invalid or broken
  }
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}
