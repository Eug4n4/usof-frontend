import ButtonLink from "../button/ButtonLink";
import { useState } from "react";
import s from "../button/button.module.css";
import p from "./pagination.module.css";
function PageSize() {
  const [size, setSize] = useState(5);
  return (
    <div className={p.page_sizes}>
      {[5, 10, 15].map((amount) => (
        <ButtonLink
          to={"/"}
          key={amount}
          className={size === amount ? s.active : ""}
          onClick={() => setSize(amount)}
        >
          {amount}
        </ButtonLink>
      ))}
      <p>Per page</p>
    </div>
  );
}

export default PageSize;
