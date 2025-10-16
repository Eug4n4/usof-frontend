import "../../assets/css/auth/register.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import AuthService from "../../api/services/AuthService";
import { useState } from "react";
function Register() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  async function handleRegister(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const data = Object.fromEntries(formData);
      await AuthService.register(data);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="register_form" onSubmit={handleRegister}>
      <h2>Sign Up</h2>
      <section id="form_inputs">
        <div className="field_wrapper">
          <div className="form_field">
            <input
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Full name"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="field_wrapper">
          <div className="form_field">
            <input
              autoComplete="off"
              type="text"
              name="login"
              id="login"
              placeholder="Login"
              required
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
              required
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
              required
            />
          </div>
        </div>

        <div className="field_wrapper">
          <div className="form_field">
            <input
              autoComplete="off"
              type="password"
              name="password_confirm"
              id="confirm_password"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>
        <Button type="submit" id="submit_register" disabled={submitting}>
          {submitting ? "Submitting..." : "Register now"}
        </Button>
      </section>

      <div id="to_login">
        <p>
          Already have an account?
          <br />
          <Link to={"/signin"}>Sign In</Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
