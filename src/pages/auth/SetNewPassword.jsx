import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../../api/services/AuthService";

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
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Enter new password:</label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={8}
            onChange={(e) =>
              setFieldAndError(setPassword, e.target.value, newPassword)
            }
          />
          <label htmlFor="new_password">Repeat password:</label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            minLength={8}
            onChange={(e) =>
              setFieldAndError(setNewPassword, e.target.value, password)
            }
          />
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <h1>Wrong Link</h1>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>
          Your password has been successfully reset!
        </p>
      )}
    </>
  );
}

export default SetNewPassword;
