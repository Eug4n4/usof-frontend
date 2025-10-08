import "../../assets/css/pagination/pagination.css";
import { NavLink } from "react-router-dom";
function Pagination() {
  return (
    <div className="pages">
      <NavLink className="page">1</NavLink>
      <NavLink className="page">2</NavLink>
    </div>
  );
}

export default Pagination;
