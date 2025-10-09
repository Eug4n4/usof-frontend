import "../../assets/css/auth/register.css";
import api from "../../api/api";
function Register() {
  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await api.post(
        "auth/register",
        Object.fromEntries(formData.entries())
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
            />
          </div>
        </div>
        <div className="field_wrapper">
          <div className="form_field">
            <input
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
              type="password"
              name="password_confirm"
              id="confirm_password"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>
        <button type="submit" id="submit_register">
          Register now
        </button>
      </section>

      <div id="to_login">
        <p>
          Already have an account?
          <br />
          <a href="#">Sign In</a>
        </p>
      </div>
    </form>
  );
}

export default Register;
