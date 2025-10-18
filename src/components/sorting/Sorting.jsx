import { useState } from "react";
import "../../assets/css/sorting/sorting.css";
import Filter from "../filter/Filter";
import ButtonLink from "../button/ButtonLink";
import Button from "../button/Button";
import s from "../button/button.module.css";
import { usePosts } from "../../contexts/PostContext";
import api from "../../api/api";
function Sorting() {
  const baseURL = import.meta.env.BASE_URL;
  const { dispatch } = usePosts();
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

  const handleSortClick = async (option) => {
    setActiveSort(option.key);
    dispatch({ type: "load", data: true });

    try {
      const result = await api.get(`/posts?${option.query}`);
      if (result.data?.data) {
        dispatch({ type: "set", data: result.data.data });
      }
    } finally {
      dispatch({ type: "load", data: false });
    }
  };

  return (
    <div className="sorting_wrapper">
      <div className="sorting_container">
        <ul className="sorting_options">
          {sortOptions.map((option) => (
            <li key={option.key}>
              <ButtonLink
                to={`${baseURL}?${option.query}`}
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
