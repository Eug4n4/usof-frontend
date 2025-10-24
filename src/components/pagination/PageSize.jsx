import ButtonLink from "../button/ButtonLink";
import { useMemo, useState } from "react";
import s from "../button/button.module.css";
import p from "./pagination.module.css";
import Button from "../button/Button";

function PageSize({ initialSize, purpose }) {
  const query = purpose.query;
  const availableSizes = useMemo(() => {
    return Array.from({ length: 3 }, (value, i) => initialSize * (i + 1));
  }, [initialSize]);

  function changePageSize(newSize) {
    const updatedQuery = query.replace(/[&\?]pageSize=\d+/, "");
    const newQuery = `${updatedQuery}${
      updatedQuery ? "&" : ""
    }pageSize=${newSize}`;
    purpose.setPageSize(newSize);
    purpose.changeCurrentPage(1);
    purpose.changePageSize(newQuery);
    purpose.setQuery(newQuery);
  }

  return (
    <div className={p.page_sizes}>
      {availableSizes.map((amount) => (
        <Button
          key={amount}
          className={purpose.pageSize === amount ? s.active : ""}
          onClick={() => {
            changePageSize(amount);
          }}
        >
          {amount}
        </Button>
      ))}
      <p>Per page</p>
    </div>
  );
}

export default PageSize;
