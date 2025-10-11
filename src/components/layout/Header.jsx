import { Link } from "react-router-dom";
import "../../assets/css/layout/header.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <ul className="header_list">
        <li>
          <div className="header_left">
            <Link to="/">
              <img src="/react.svg" alt="logo" />
            </Link>
            <Link to="/about">
              <button type="button" className="header button">
                About
              </button>
            </Link>
          </div>
        </li>
        <li className="search_parent">
          <div className="search_group">
            <form action="" className="search_group form">
              <input
                type="text"
                name="search"
                id="header_search"
                placeholder="Search..."
              />
              <button type="submit" className="search_button">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </li>
        <li className="header_right_parent">
          <div className="header_right">
            <Link to="/categories">
              <button type="button" className="header button">
                Categories
              </button>
            </Link>
            {user ? (
              <Link to="/signout">
                <button type="button" className="header button">
                  Sign Out
                </button>
              </Link>
            ) : (
              <>
                <Link to="/signin">
                  <button type="button" className="header button">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="button" className="header button">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            <Link to="/post">
              <button type="button" className="header button">
                <svg
                  display="block"
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#242424"
                >
                  <path d="M206.04-148.08q-28.64 0-48.46-19.91-19.81-19.92-19.81-48.28v-528.27q0-28.36 19.81-48.27 19.82-19.92 48.46-19.92h362.42v55.96H206.04q-4.81 0-8.56 3.85-3.75 3.84-3.75 8.46v528.11q0 4.62 3.75 8.47 3.75 3.84 8.56 3.84h528.11q4.62 0 8.46-3.84 3.85-3.85 3.85-8.47v-362.61h55.96v362.71q0 28.34-19.91 48.26-19.92 19.91-48.27 19.91h-528.2Zm117.69-145.15v-55.96h292.73v55.96H323.73Zm0-119.19v-55.96h292.73v55.96H323.73Zm0-119.2v-55.96h292.73v55.96H323.73Zm363.54-86.77v-79.19h-79.19v-55.96h79.19v-79.19h55.96v79.19h79.19v55.96h-79.19v79.19h-55.96Z" />
                </svg>
              </button>
            </Link>
            <div>
              <Link to="/profile">
                <img src="/react.svg" alt="user" />
              </Link>
            </div>
            <div className="user_info">
              <p>{user ? user.login : "Login"}</p>
              <p>{user ? user.role : "User"}</p>
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
