import { useState } from "react";
import "../../assets/css/sorting/sorting.css";
import Filter from "../filter/Filter";
import ButtonLink from "../button/ButtonLink";
import Button from "../button/Button";

function Sorting() {
  const baseURL = import.meta.env.BASE_URL;
  const [hiddenFilter, setFilterHidden] = useState(true);

  return (
    <div className="sorting_wrapper">
      <div className="sorting_container">
        <ul className="sorting_options">
          <li>
            <ButtonLink to={baseURL}>Newest</ButtonLink>
          </li>
          <li>
            <ButtonLink to={baseURL}>Oldest</ButtonLink>
          </li>
          <li>
            <ButtonLink to={baseURL}>Most liked</ButtonLink>
          </li>
          <li>
            <ButtonLink to={baseURL}>Least liked</ButtonLink>
          </li>
          <li>
            <div className="filter_container">
              <Button onClick={() => setFilterHidden(!hiddenFilter)}>
                <img src="/filter_icon_black.svg" alt="filter" />
                <p>Filter</p>
              </Button>
            </div>
          </li>
        </ul>
        {hiddenFilter ? null : <Filter />}
      </div>
    </div>
  );
}

export default Sorting;
