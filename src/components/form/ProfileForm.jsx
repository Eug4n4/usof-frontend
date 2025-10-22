import { useContext, useEffect, useState } from "react";
import Button from "../button/Button";
import TextInput from "../input/TextInput";
import Form from "./Form";
import UserService from "../../api/services/UserService";
import AuthContext from "../../contexts/AuthContext";

function ProfileForm({ isHidden, fullName, login, role, rating }) {
  const [name, setFullName] = useState(fullName);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setFullName(fullName);
  }, [isHidden]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    UserService.updateCredentials(user.id, formData)
      .then((response) => setUser(response.data))
      .catch(console.log);
  }
  function getFormContent() {
    if (isHidden) {
      return (
        <>
          <TextInput name="full_name" value={fullName} readOnly disabled />
          <TextInput name="login" value={login} readOnly disabled />
          <TextInput name="role" value={role} readOnly disabled />
        </>
      );
    }
    return (
      <>
        <TextInput
          name="full_name"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextInput name="login" value={login} readOnly disabled />
        <TextInput name="role" value={role} readOnly disabled />
        <Button type="submit">Update</Button>
      </>
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h4>Personal information</h4>
      {getFormContent()}
      <p>{`Rating: ${rating}`}</p>
    </Form>
  );
}

export default ProfileForm;
