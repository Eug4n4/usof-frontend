import s from "./button.module.css";

function Button({ children, ...rest }) {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  );
}

export default Button;
