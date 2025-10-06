import { Link } from "react-router-dom";
import "../../assets/css/header.css";

function Header() {
  return (
    <header className="header">
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
            <Link to="/signout">
              <button type="button" className="header button">
                Sign Out
              </button>
            </Link>
            <Link to="/create-post">
              <button type="button" className="header button">
                +
              </button>
            </Link>
            <Link to="/profile">
              <img src="/react.svg" alt="user" />
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
