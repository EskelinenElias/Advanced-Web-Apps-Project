import { jwtDecode } from "jwt-decode";

function verifyToken(): boolean {
  const token = localStorage.getItem("token"); 
  if (!token) {
    return false;
  } else {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }
}

export default verifyToken;