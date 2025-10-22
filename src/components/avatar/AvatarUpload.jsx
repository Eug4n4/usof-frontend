import { useContext, useEffect, useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import AuthContext from "../../contexts/AuthContext";
import UserService from "../../api/services/UserService";

import s from "./avatar.upload.module.css";

function AvatarUpload({ isHidden }) {
  const { user, setUser } = useContext(AuthContext);
  const [avatarUploaded, setAvatarUploaded] = useState(true);

  useEffect(() => {
    setAvatarUploaded(true);
  }, [isHidden]);

  async function handleAvatarChange(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    e.target.reset();
    if (formData.get("avatar").size === 0) {
      setAvatarUploaded(false);
    } else {
      setAvatarUploaded(true);
    }
    try {
      const response = await UserService.updateAvatar(user.id, formData);
      setUser(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <form
      className={s.avatar_upload}
      style={{ display: isHidden ? "none" : "flex" }}
      onSubmit={handleAvatarChange}
    >
      <Input type="file" name="avatar" id="file" />
      <Button type="submit">Upload</Button>
      <div className={s.avatar_error}>
        {!avatarUploaded && <p>Please upload your avatar before submitting</p>}
      </div>
    </form>
  );
}

export default AvatarUpload;
