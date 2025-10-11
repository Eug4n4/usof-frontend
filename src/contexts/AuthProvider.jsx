import { useEffect, useRef, useState } from "react";
import AuthContext from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import AuthService from "../api/services/AuthService";

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const ignore = useRef(false);
  useEffect(() => {
    async function handleRefresh() {
      try {
        await AuthService.refresh();
        const access = Cookies.get("access");
        if (access !== undefined) {
          setUser(jwtDecode(access));
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    if (user == undefined) {
      const access = Cookies.get("access");
      if (access !== undefined) {
        const payload = jwtDecode(access);
        setUser(payload);
        setLoading(false);
      } else {
        if (!ignore.current) {
          handleRefresh();
          ignore.current = true;
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
