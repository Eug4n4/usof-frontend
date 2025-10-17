import Button from "../../components/button/Button";
import AuthService from "../../api/services/AuthService";
import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
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
    <Form id="remind_form" onSubmit={handleSubmit}>
      <h3>Password Reminder</h3>
      <Input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Email"
      />
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Send recovery email"}
      </Button>
    </Form>
  );
}

export default PasswordReset;
