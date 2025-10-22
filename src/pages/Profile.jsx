import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DetailView from "../components/details/DetailView";
import Avatar from "../components/avatar/Avatar";
import getUserAvatar from "../features/avatars";
import Form from "../components/form/Form";
import TextInput from "../components/input/TextInput";
import Button from "../components/button/Button";

import s from "../components/button/button.module.css";
import Sorting from "../components/sorting/Sorting";
import Filter from "../components/filter/Filter";
import AvatarUpload from "../components/avatar/AvatarUpload";
import ProfileForm from "../components/form/ProfileForm";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("post");
  const [disableForms, setDisableForms] = useState(true);
  const favoriteButtonKey = "favorite";
  const postButtonKey = "post";

  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user]);
  return (
    <>
      {user ? (
        <DetailView
          heading="Profile page"
          controlsChildren={
            <>
              {disableForms ? (
                <Button onClick={() => setDisableForms(!disableForms)}>
                  Edit
                </Button>
              ) : (
                <Button onClick={() => setDisableForms(!disableForms)}>
                  Cancel
                </Button>
              )}
              <Button>Delete profile</Button>
            </>
          }
          topChildren={
            <>
              <div className="top left" style={{ alignSelf: "center" }}>
                <Avatar
                  src={getUserAvatar(user.photo)}
                  width={128}
                  height={128}
                />
                <AvatarUpload isHidden={disableForms} />
              </div>
              <div className="top right">
                <ProfileForm
                  isHidden={disableForms}
                  fullName={user.full_name}
                  login={user.login}
                  role={user.role}
                  rating={user.rating}
                />
              </div>
            </>
          }
          anchorChildren={
            <>
              <Button
                key={postButtonKey}
                className={activeButton === postButtonKey ? s.active : ""}
                onClick={() => setActiveButton(postButtonKey)}
              >
                Your Posts
              </Button>
              <Button
                key={favoriteButtonKey}
                className={activeButton === favoriteButtonKey ? s.active : ""}
                onClick={() => setActiveButton(favoriteButtonKey)}
              >
                Favorites
              </Button>
            </>
          }
          listChildren={[]}
          sortingChildren={<Sorting filter={<Filter />} />}
        />
      ) : null}
    </>
  );
}

export default Profile;
