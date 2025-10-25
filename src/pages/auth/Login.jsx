import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AuthService from "../../api/services/AuthService";
import Button from "../../components/button/Button";
import TextInput from "../../components/input/TextInput";
import PasswordInput from "../../components/input/PasswordInput";
import Form from "../../components/form/Form";

import s from "../../components/form/form.module.css";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);
  async function handleLogin(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    try {
      const response = await AuthService.login(
        Object.fromEntries(formData.entries())
      );
      setUser(response.data);
    } catch (error) {
      setError(
        "There is an error. Make sure password, email and login matches"
      );
    } finally {
      setSubmitting(false);
    }
  }
  if (user) {
    return null;
  }
  return (
    <Form method="get" id="login_form" onSubmit={handleLogin}>
      <h2>Sign In</h2>
      <TextInput placeholder="Login" name="login" id="login" required />
      <TextInput
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <PasswordInput
        placeholder="Password"
        name="password"
        id="password"
        minLength={8}
        required
      />
      <Button type="submit" id="submit_login" disabled={submitting}>
        {submitting ? "Submitting..." : "Sign In"}
      </Button>
      <div id="to_register">
        <p>
          New here?
          <br />
          <Link to={"/signup"}>Sign Up</Link>
        </p>
        <Link to={"/password-reset"}>Forgot password?</Link>
      </div>
      <div className={error !== "" ? s.errors : ""}>
        {error !== "" && <p>{error}</p>}
      </div>
    </Form>
  );
}

export default Login;
