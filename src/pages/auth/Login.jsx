import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import "../../assets/css/auth/login.css";
import AuthService from "../../api/services/AuthService";

function Login() {
  const { setUser } = useContext(AuthContext);
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

  return (
    <form method="get" id="login_form" onSubmit={handleLogin}>
      <h2>Sign In</h2>
      <fieldset id="form_inputs">
        <div className="field_wrapper">
          <div className="form_field">
            <input
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
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required=""
            />
          </div>
        </div>
        <div className="field_wrapper">
          <div className="form_field">
            <input
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
        <button type="submit" id="submit_login">
          Sign In
        </button>
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
