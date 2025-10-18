import { useState } from "react";
import "../../assets/css/sorting/sorting.css";
import Filter from "../filter/Filter";
import ButtonLink from "../button/ButtonLink";
import Button from "../button/Button";
import s from "../button/button.module.css";
function Sorting() {
  const baseURL = import.meta.env.BASE_URL;
  const [hiddenFilter, setFilterHidden] = useState(true);
  const [activeSort, setActiveSort] = useState("newest");
  const sortOptions = [
    { key: "newest", label: "Newest" },
    { key: "oldest", label: "Oldest" },
    { key: "most-liked", label: "Most liked" },
    { key: "most-disliked", label: "Most disliked" },
  ];
  return (
    <div className="sorting_wrapper">
      <div className="sorting_container">
        <ul className="sorting_options">
          {sortOptions.map((option) => (
            <li key={option.key}>
              <ButtonLink
                to={baseURL}
                className={option.key === activeSort ? s.active : ""}
                onClick={() => setActiveSort(option.key)}
              >
                {option.label}
              </ButtonLink>
            </li>
          ))}
          <li>
            <div className="filter_container">
              <Button
                className={hiddenFilter ? "" : s.active}
                onClick={() => setFilterHidden(!hiddenFilter)}
              >
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
