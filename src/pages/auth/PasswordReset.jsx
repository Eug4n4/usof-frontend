import Button from "../../components/button/Button";
import "../../assets/css/auth/remind.css";
import AuthService from "../../api/services/AuthService";
import { useState } from "react";
function PasswordReset() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    await AuthService.sendResetPassword(Object.fromEntries(formData));
    setSubmitting(false);
  }
  return (
    <form id="remind_form" onSubmit={handleSubmit}>
      <fieldset>
        <h3>Password Reminder</h3>
        <input
          type="email"
          name="email"
          id="email"
          required=""
          placeholder="Email"
          autoComplete="off"
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Send recovery email"}
        </Button>
      </fieldset>
    </form>
  );
}

export default PasswordReset;
