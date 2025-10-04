import { Link } from "react-router-dom";
import "../../assets/css/header.css";

function Header() {
  return (
    <header className="header">
      <ul className="header_list">
        <li>
          <Link to="/">
            <img src="/react.svg" alt="logo" />
          </Link>
        </li>
        <li>
          <Link to="/about">
            <button type="button" className="header button">
              About
            </button>
          </Link>
        </li>
        <li>
          <div className="search_group">
            <form action="" className="search_group form">
              <button type="submit" className="header button">
                <i className="fa fa-search"></i>
              </button>
              <input
                type="text"
                name="search"
                id="header_search"
                placeholder="Search..."
              />
            </form>
          </div>
        </li>
        <li>
          <Link to="/categories">
            <button type="button" className="header button">
              Categories
            </button>
          </Link>
        </li>
        <li>
          <Link to="/signin">
            <button type="button" className="header button">
              Sign In
            </button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button type="button" className="header button">
              Sign Up
            </button>
          </Link>
        </li>
        <li>
          <Link to="/signout">
            <button type="button" className="header button">
              Sign Out
            </button>
          </Link>
        </li>
        <li>
          <Link to="/create-post">
            <button type="button" className="header button">
              +
            </button>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img src="/vite.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
