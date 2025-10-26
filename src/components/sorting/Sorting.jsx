import { useState } from "react";
import Button from "../button/Button";
import { useDispatch } from "react-redux";

import s from "../button/button.module.css";
import ss from "./sorting.module.css";

import { INITIAL_PAGE_SIZE } from "../../features/constants";

function Sorting({
  getter,
  queryChanger,
  pageChanger,
  pageSizer,
  filter,
  sortingOptions,
  defaultSorting,
}) {
  const dispatch = useDispatch();
  const [hiddenFilter, setFilterHidden] = useState(true);
  const [activeSort, setActiveSort] = useState(defaultSorting);

  /* after changing sort option, move to the first page
  change page size to initial value
  change bg color of the button your clicked
  set query parameters for this sorting response */
  const handleSortClick = (option) => {
    dispatch(pageChanger(1));
    dispatch(pageSizer(INITIAL_PAGE_SIZE));
    setActiveSort(option.key);
    dispatch(getter(option.query));
    dispatch(queryChanger(option.query));
  };
  return (
    <div className={ss.sorting_wrapper}>
      <div className={ss.sorting_container}>
        <ul className={ss.sorting_options}>
          {sortingOptions.map((option) => (
            <li key={option.key}>
              <Button
                className={option.key === activeSort ? s.active : ""}
                onClick={() => {
                  setActiveSort(option.key);
                  handleSortClick(option);
                }}
              >
                {option.label}
              </Button>
            </li>
          ))}
          <li>
            <div className={ss.filter_container}>
              {filter ? (
                <Button
                  className={hiddenFilter ? "" : s.active}
                  onClick={() => setFilterHidden(!hiddenFilter)}
                >
                  <img src="/filter_icon_black.svg" alt="filter" />
                  <p>Filter</p>
                </Button>
              ) : null}
            </div>
          </li>
        </ul>
      </div>
      {hiddenFilter ? null : filter ? filter : null}
    </div>
  );
}

export default Sorting;
