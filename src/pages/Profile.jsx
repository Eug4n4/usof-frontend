import { useContext, useEffect, useState } from "react";
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
import Pagination from "../components/pagination/Pagination";

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("post");
  const favoriteButtonKey = "favorite";
  const postButtonKey = "post";
  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user]);
  return (
    <DetailView
      heading="Profile page"
      topChildren={
        <>
          <div className="top left" style={{ alignSelf: "center" }}>
            <Avatar src={getUserAvatar(user.photo)} width={128} height={128} />
          </div>
          <div className="top right">
            <Form>
              <h4>Personal information</h4>
              <TextInput
                name="full_name"
                value={user.full_name}
                readOnly
                disabled
              />
              <TextInput name="login" value={user.login} readOnly disabled />
              <TextInput name="role" value={user.role} readOnly disabled />
            </Form>
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
      sortingChildren={<Sorting filter={<Filter />} />}
    />
  );
}

export default Profile;
