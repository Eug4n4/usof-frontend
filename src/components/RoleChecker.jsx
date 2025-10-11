import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function RoleChecker({ roles = [], children }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (user == null) {
        return navigate("/signin", { replace: true });
      }
      if (roles.length != 0 && !roles.includes(user.role)) {
        if (window.history.state) {
          navigate(-1);
        } else {
          navigate("/", { replace: true });
        }
      }
    }
  }, [user, loading]);
  if (!user || !roles.includes(user.role)) {
    return null;
  }
  return children;
}

export default RoleChecker;
