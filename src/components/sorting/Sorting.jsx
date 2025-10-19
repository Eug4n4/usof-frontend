import { useState } from "react";
import Filter from "../filter/Filter";
import ButtonLink from "../button/ButtonLink";
import Button from "../button/Button";
import { useDispatch } from "react-redux";

import s from "../button/button.module.css";
import "../../assets/css/sorting/sorting.css";
import { INITIAL_PAGE_SIZE } from "../../features/constants";

function Sorting({ getter, queryChanger, pageChanger, pageSizer }) {
  const dispatch = useDispatch();
  const [hiddenFilter, setFilterHidden] = useState(true);
  const [activeSort, setActiveSort] = useState("newest");
  const sortOptions = [
    { key: "newest", label: "Newest", query: "sort=date&order=desc" },
    { key: "oldest", label: "Oldest", query: "sort=date&order=asc" },
    { key: "most-liked", label: "Most liked", query: "sort=likes&order=desc" },
    {
      key: "most-disliked",
      label: "Most disliked",
      query: "sort=dislikes&order=desc",
    },
  ];
  const handleSortClick = (option) => {
    dispatch(pageChanger(1));
    dispatch(pageSizer(INITIAL_PAGE_SIZE));
    setActiveSort(option.key);
    dispatch(getter(option.query));
    dispatch(queryChanger(option.query));
  };
  return (
    <div className="sorting_wrapper">
      <div className="sorting_container">
        <ul className="sorting_options">
          {sortOptions.map((option) => (
            <li key={option.key}>
              <ButtonLink
                to={`?${option.query}`}
                className={option.key === activeSort ? s.active : ""}
                onClick={() => {
                  setActiveSort(option.key);
                  handleSortClick(option);
                }}
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
