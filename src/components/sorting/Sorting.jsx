import { useState } from "react";
import "../../assets/css/sorting/sorting.css";
import { Link } from "react-router-dom";
import Filter from "../filter/Filter";

function Sorting() {
  const baseURL = import.meta.env.BASE_URL;
  const [hiddenFilter, setFilterHidden] = useState(true);

  function handleFilterClick() {
    setFilterHidden(!hiddenFilter);
  }
  return (
    <div className="sorting_wrapper">
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
              <button onClick={handleFilterClick}>
                <img src="/filter_icon_black.svg" alt="filter" />
                <p>Filter</p>
              </button>
            </div>
          </li>
        </ul>
      </div>
      {hiddenFilter ? null : <Filter />}
    </div>
  );
}

export default Sorting;
