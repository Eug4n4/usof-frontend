import "../../assets/css/pagination/pagination.css";
import s from "../button/button.module.css";
import { useState } from "react";
import ButtonLink from "../button/ButtonLink";
function Pagination() {
  const [size, setSize] = useState(1);
  return (
    <div className="pages">
      {[1, 2, 3].map((amount) => {
        return (
          <ButtonLink
            to={"/"}
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
