import { Link } from "react-router-dom";
import "../../assets/css/layout/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar_list">
        <li>
          <div className="sidebar_item">
            <Link to="/">
              <img src="/home_icon_black.svg" height={30} width={30}></img>
              <p>Home</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="sidebar_item">
            <Link to="/categories">
              <img src="/category_icon_black.svg" height={30} width={30}></img>
              <p>Categories</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="sidebar_item">
            <Link to="/post">
              <img src="/post_icon_black.svg" height={30} width={30}></img>
              <p>New post</p>
            </Link>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
