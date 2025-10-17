import s from "./form.module.css";

function Form({ children, ...props }) {
  return (
    <div className={s.form_wrapper}>
      <form {...props}>{children}</form>
    </div>
  );
}

export default Form;
