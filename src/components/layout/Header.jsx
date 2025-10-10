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
                +
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
