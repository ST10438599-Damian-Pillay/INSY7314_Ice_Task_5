import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("photoshare_token");
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem("photoshare_user") || "null");
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return typeof decoded.exp !== "number" || decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function saveSession(token, user) {
  localStorage.setItem("photoshare_token", token);
  localStorage.setItem("photoshare_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("photoshare_token");
  localStorage.removeItem("photoshare_user");
}
