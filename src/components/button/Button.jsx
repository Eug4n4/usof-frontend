import s from "./button.module.css";

function Button({ children, className = "", ...rest }) {
  return (
    <button className={`${s.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
