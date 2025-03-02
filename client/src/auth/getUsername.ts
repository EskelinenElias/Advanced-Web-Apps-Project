import { jwtDecode } from "jwt-decode";

function getUsername(): string {
  const token = localStorage.getItem("token"); 
  if (!token) {
    return "";
  } else {
    try {
      const { username } = jwtDecode<{ username: string }>(token);
      return username;
    } catch {
      return "";
    }
  }
}

export default getUsername;