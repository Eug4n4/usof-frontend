import ButtonLink from "../button/ButtonLink";
import { useMemo, useState } from "react";
import s from "../button/button.module.css";
import p from "./pagination.module.css";

function PageSize({ initialSize, purpose }) {
  const query = purpose.query;
  const availableSizes = useMemo(() => {
    return Array.from({ length: 3 }, (value, i) => initialSize * (i + 1));
  }, [initialSize]);

  function changePageSize(newSize) {
    let pageSize = "";
    if (query !== "") {
      pageSize += `${query}&`;
    }
    pageSize += `pageSize=${newSize}`;
    purpose.setPageSize(newSize);
    purpose.changeCurrentPage(1);
    purpose.changePageSize(pageSize);
  }

  function mapPageSizeLink(size) {
    let pageSize = "";
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
          className={purpose.pageSize === amount ? s.active : ""}
          onClick={() => {
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
