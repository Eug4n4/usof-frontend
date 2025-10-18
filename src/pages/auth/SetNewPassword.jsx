import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../../api/services/AuthService";
import Form from "../../components/form/Form";
import PasswordInput from "../../components/input/PasswordInput";
function SetNewPassword() {
  const { token } = useParams();
  const [isValidToken, setIsValidToken] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    try {
      const payload = jwtDecode(token);
      console.log(payload);
    } catch (e) {
      console.log(e.message);
      setIsValidToken(false);
    }
  }, [token]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (error !== "") {
      setError("Please enter the same password twice");
      return;
    }
    const formData = new FormData(e.target);
    await AuthService.confirmResetPassword(token, Object.fromEntries(formData));
    setSuccess(true);
  }

  function setFieldAndError(setter, newValue, valueToCompare) {
    setter(newValue);
    setError(newValue !== valueToCompare ? "Fields don't match" : "");
  }

  return (
    <>
      {isValidToken ? (
        <Form onSubmit={handleSubmit}>
          <h2>Set new password</h2>
          <label htmlFor="password">Enter new password:</label>
          <PasswordInput
            name="password"
            id="password"
            placeholder="Enter new password"
            minLength={8}
            required
            onChange={(e) =>
              setFieldAndError(setPassword, e.target.value, newPassword)
            }
          />
          <label htmlFor="new_password">Repeat password:</label>
          <PasswordInput
            name="new_password"
            id="new_password"
            placeholder="Repeat password"
            minLength={8}
            required
            onChange={(e) =>
              setFieldAndError(setNewPassword, e.target.value, password)
            }
          />
          <Button type="submit">Submit</Button>
        </Form>
      ) : (
        <h1>Wrong Link</h1>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>
          Your password has been successfully reset!
        </p>
      )}
    </>
  );
}

export default SetNewPassword;
