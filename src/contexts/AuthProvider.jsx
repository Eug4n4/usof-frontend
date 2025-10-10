import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import AuthService from "../api/services/AuthService";
import { useNavigate } from "react-router-dom";
function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    async function handleRefresh() {
      try {
        await AuthService.refresh();
        console.log("here");
        const access = Cookies.get("access");
        if (access !== undefined) {
          setUser(jwtDecode(access));
        }
      } catch (e) {
        navigate("/signin", { replace: true });
      }
    }
    if (user == undefined) {
      const access = Cookies.get("access");
      if (access !== undefined) {
        const payload = jwtDecode(access);
        setUser(payload);
      } else {
        if (!ignore) {
          handleRefresh();
        }
      }
      return () => {
        ignore = true;
      };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
