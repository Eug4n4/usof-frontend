import s from "./input.module.css";

function Input({ children, ...rest }) {
  return (
    <div className={s.input_wrapper}>
      <input autoComplete="off" {...rest} />
      {children}
    </div>
  );
}

export default Input;
