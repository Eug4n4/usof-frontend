import p from "./pagination.module.css";
import s from "../button/button.module.css";
import { useMemo } from "react";
import ButtonLink from "../button/ButtonLink";
function Pagination({ purpose }) {
  const query = purpose.query;
  const pages = useMemo(
    () => Array.from({ length: purpose.totalPages }, (_, i) => i + 1),
    [purpose.totalPages]
  );

  function changePage(newPage) {
    let page = "";
    if (query !== "") {
      page += `${query}&`;
    }
    page += `page=${newPage}`;
    purpose.changeCurrentPage(newPage);
    purpose.goToPage(page);
  }

  function mapPageLink(number) {
    let page = "";
    if (query !== "") {
      page += `?${query}&page=${number}`;
    } else {
      page += `?page=${number}`;
    }
    return page;
  }
  return (
    <div className={p.pages}>
      {pages.map((item) => {
        return (
          <ButtonLink
            to={mapPageLink(item)}
            key={item}
            className={purpose.currentPage === item ? s.active : ""}
            onClick={() => {
              changePage(item);
            }}
          >
            {item}
          </ButtonLink>
        );
      })}
    </div>
  );
}

export default Pagination;
