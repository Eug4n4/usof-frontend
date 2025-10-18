import { Link } from "react-router-dom";
import s from "./button.module.css";
function ButtonLink({ to, className = "", children, ...rest }) {
  return (
    <Link className={`${s.button} ${className}`} {...rest} to={to}>
      {children}
    </Link>
  );
}

export default ButtonLink;
