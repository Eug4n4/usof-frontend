import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user]);
  return (
    <div>
      {user ? <div>Profile {user.login}</div> : <div>Checking auth...</div>}
    </div>
  );
}

export default Profile;
