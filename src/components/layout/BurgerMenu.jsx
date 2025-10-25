import Button from "../button/Button";
import ButtonLink from "../button/ButtonLink";
import TextInput from "../input/TextInput";

import s from "./burger.module.css";

function BurgerMenu({ open, user, onLogout }) {
  return (
    <nav className={`${s.menu} ${open ? s.open : ""}`}>
      <div>
        <form className="search_group form">
          <TextInput name="search" placeholder="Search..." />
          <Button type="submit">
            <i className="fa fa-search"></i>
          </Button>
        </form>
      </div>
      <div>
        <ButtonLink to="/categories">Categories</ButtonLink>
      </div>
      {user ? (
        <div>
          <Button onClick={onLogout}>Sign Out</Button>
        </div>
      ) : (
        <>
          <div>
            <ButtonLink to="/signin">Sign in</ButtonLink>
          </div>
          <div>
            <ButtonLink to="/signup">Sign up</ButtonLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default BurgerMenu;
