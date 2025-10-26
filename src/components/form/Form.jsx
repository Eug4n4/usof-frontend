import s from "./form.module.css";
import ss from "../sorting/sorting.module.css";

function Form({ children, ...props }) {
  return (
    <div className={s.form_wrapper} id={ss.filter}>
      <form {...props}>{children}</form>
    </div>
  );
}

export default Form;
