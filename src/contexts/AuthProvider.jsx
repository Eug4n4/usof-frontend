import { useEffect, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import AuthService from "../api/services/AuthService";

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const ignore = useRef(false);
  useEffect(() => {
    async function handleRefresh() {
      await AuthService.refresh();
      const access = Cookies.get("access");
      if (access !== undefined) {
        setUser(jwtDecode(access));
      }
    }
    if (user == undefined) {
      const access = Cookies.get("access");
      if (access !== undefined) {
        const payload = jwtDecode(access);
        setUser(payload);
      } else {
        if (!ignore.current) {
          handleRefresh();
          ignore.current = true;
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
