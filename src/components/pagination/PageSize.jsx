import "../../assets/css/pagination/pagination.css";
import { NavLink } from "react-router-dom";
function PageSize() {
  return (
    <div className="page_sizes">
      <NavLink className="size">5</NavLink>
      <NavLink className="size">10</NavLink>
      <NavLink className="size">15</NavLink>
      <p>Per page</p>
    </div>
  );
}

export default PageSize;
