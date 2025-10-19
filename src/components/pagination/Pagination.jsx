import p from "./pagination.module.css";
import s from "../button/button.module.css";
import { useState } from "react";
import ButtonLink from "../button/ButtonLink";
function Pagination({ purpose }) {
  const [size, setSize] = useState(1);

  function mapPageLink(number) {
    let page = "";
    if (purpose === "posts") {
      page += "/";
    } else if (purpose === "categories") {
      page += "/categories";
    }
    page += `?page=${number}`;
    return page;
  }
  return (
    <div className={p.pages}>
      {[1, 2, 3].map((amount) => {
        return (
          <ButtonLink
            to={mapPageLink(amount)}
            key={amount}
            className={size === amount ? s.active : ""}
            onClick={() => setSize(amount)}
          >
            {amount}
          </ButtonLink>
        );
      })}
    </div>
  );
}

export default Pagination;
