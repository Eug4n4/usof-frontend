import { useContext, useEffect, useRef } from "react";
import AuthContext from "../../contexts/AuthContext";
import AuthService from "../../api/services/AuthService";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const ignore = useRef(false);
  useEffect(() => {
    if (ignore.current) {
      return;
    }
    ignore.current = true;
    navigate("/", { replace: true });

    if (user) {
      AuthService.logout();
      setUser(null);
    }
  }, []);
  return <div>Logging out...</div>;
}

export default Logout;
