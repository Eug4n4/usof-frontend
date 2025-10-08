import "../../assets/css/sorting/sorting.css";
import { Link } from "react-router-dom";

function Sorting() {
  const baseURL = import.meta.env.BASE_URL;
  return (
    <div className="sorting_container">
      <ul className="sorting_options">
        <li>
          <Link to={baseURL}>Newest</Link>
        </li>
        <li>
          <Link to={baseURL}>Oldest</Link>
        </li>
        <li>
          <Link to={baseURL}>Most liked</Link>
        </li>
        <li>
          <Link to={baseURL}>Least liked</Link>
        </li>
        <li>
          <div className="filter_container">
            <img src="/filter_icon_black.svg" alt="filter" />
            <Link to={baseURL}>Filter</Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sorting;
