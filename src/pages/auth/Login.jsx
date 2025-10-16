import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "../../assets/css/auth/login.css";
import AuthService from "../../api/services/AuthService";
import Button from "../../components/button/Button";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);
  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await AuthService.login(
        Object.fromEntries(formData.entries())
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  if (user) {
    return null;
  }
  return (
    <form method="get" id="login_form" onSubmit={handleLogin}>
      <h2>Sign In</h2>
      <fieldset id="form_inputs">
        <div className="field_wrapper">
          <div className="form_field">
            <input
              autoComplete="off"
              type="text"
              name="login"
              id="login"
              placeholder="Login"
              required=""
            />
          </div>
        </div>
        <div className="field_wrapper">
          <div className="form_field">
            <input
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required=""
            />
          </div>
        </div>
        <div className="field_wrapper">
          <div className="form_field">
            <input
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              defaultValue=""
              maxLength={16}
              required=""
            />
          </div>
        </div>
        <Button type="submit" id="submit_login">
          Sign In
        </Button>
      </fieldset>
      <div id="to_register">
        <p>
          New here?
          <br />
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
