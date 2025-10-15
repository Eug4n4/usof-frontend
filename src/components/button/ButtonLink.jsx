import { Link } from "react-router-dom";
import s from "./button.module.css";
function ButtonLink({ to, children, ...rest }) {
  return (
    <Link className={s.button} {...rest} to={to}>
      {children}
    </Link>
  );
}

export default ButtonLink;
