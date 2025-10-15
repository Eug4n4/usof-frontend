import "../../assets/css/layout/sidebar.css";
import ButtonLink from "../button/ButtonLink";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar_list">
        <li>
          <div className="sidebar_item">
            <ButtonLink to="/">
              <img src="/home_icon_black.svg" height={30} width={30}></img>
              <p>Home</p>
            </ButtonLink>
          </div>
        </li>
        <li>
          <div className="sidebar_item">
            <ButtonLink to="/categories">
              <img src="/category_icon_black.svg" height={30} width={30}></img>
              <p>Categories</p>
            </ButtonLink>
          </div>
        </li>
        <li>
          <div className="sidebar_item">
            <ButtonLink to="/post">
              <img src="/post_icon_black.svg" height={30} width={30}></img>
              <p>New post</p>
            </ButtonLink>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
