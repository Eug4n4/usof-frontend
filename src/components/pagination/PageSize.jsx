import ButtonLink from "../button/ButtonLink";
import { useMemo, useState } from "react";
import s from "../button/button.module.css";
import p from "./pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../features/state/postSlice";
import { getCategories } from "../../features/state/categorySlice";
function PageSize({ initialSize, purpose }) {
  const [size, setSize] = useState(initialSize);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.posts.query);
  const availableSizes = useMemo(() => {
    return Array.from({ length: 3 }, (value, i) => initialSize * (i + 1));
  }, [initialSize]);

  function changePageSize(newSize) {
    let pageSize = "";
    if (query !== "") {
      pageSize += `${query}&`;
    }
    pageSize += `pageSize=${newSize}`;
    if (purpose === "posts") {
      dispatch(getPosts(pageSize));
    } else if (purpose === "categories") {
      dispatch(getCategories(pageSize));
    }
  }

  function mapPageSizeLink(size) {
    let pageSize = "";
    if (purpose === "posts") {
      pageSize += "/";
    }
    if (query !== "") {
      pageSize += `?${query}&pageSize=${size}`;
    } else {
      pageSize += `?pageSize=${size}`;
    }
    return pageSize;
  }

  return (
    <div className={p.page_sizes}>
      {availableSizes.map((amount) => (
        <ButtonLink
          to={mapPageSizeLink(amount)}
          key={amount}
          className={size === amount ? s.active : ""}
          onClick={() => {
            setSize(amount);
            changePageSize(amount);
          }}
        >
          {amount}
        </ButtonLink>
      ))}
      <p>Per page</p>
    </div>
  );
}

export default PageSize;
