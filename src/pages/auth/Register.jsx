import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import AuthService from "../../api/services/AuthService";
import { useState } from "react";
import TextInput from "../../components/input/TextInput";
import Input from "../../components/input/Input";
import PasswordInput from "../../components/input/PasswordInput";
import Form from "../../components/form/Form";

import s from "../../components/form/form.module.css";

function Register() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const data = Object.fromEntries(formData);
      await AuthService.register(data);
      navigate("/signin");
    } catch (error) {
      setError(
        "There is an error. Make sure you entered valid full name and login"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form id="register_form" onSubmit={handleRegister}>
      <h2>Sign Up</h2>
      <TextInput
        name="full_name"
        id="full_name"
        placeholder="Full name"
        required
      />
      <TextInput name="login" id="login" placeholder="Login" required />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <PasswordInput
        name="password"
        id="password"
        placeholder="Password"
        required
        minLength={8}
      />

      <PasswordInput
        name="password_confirm"
        id="password_confirm"
        placeholder="Repeat password"
        required
        minLength={8}
      />
      <Button type="submit" id="submit_register" disabled={submitting}>
        {submitting ? "Submitting..." : "Register now"}
      </Button>

      <div id="to_login">
        <p>
          Already have an account?
          <br />
          <Link to={"/signin"}>Sign In</Link>
        </p>
      </div>
      <div className={error !== "" ? s.errors : ""}>
        {error !== "" && <p>{error}</p>}
      </div>
    </Form>
  );
}

export default Register;
