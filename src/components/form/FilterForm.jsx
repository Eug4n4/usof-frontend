import Button from "../button/Button";
import Input from "../input/Input";
import f from "./filter.form.module.css";
import Form from "./Form";
function FilterForm() {
  return (
    <Form className={f.filter_form}>
      <div className={f.filters}>
        <fieldset>
          <legend>By category</legend>
          <div>
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" autoComplete="off" />
          </div>
        </fieldset>
        <fieldset>
          <legend>By date</legend>
          <div>
            <Input type="date" name="from" id="" />
          </div>
          <div>
            <Input type="date" name="to" id="" />
          </div>
        </fieldset>
        <fieldset>
          <legend>By status</legend>
          <div>
            <Input type="radio" name="option" id="active" checked />
            <label htmlFor="active">Active</label>
          </div>
          <div>
            <Input type="radio" name="option" id="inactive" />
            <label htmlFor="inactive">Inactive</label>
          </div>
        </fieldset>
      </div>
      <div className="filter buttons">
        <Button type="submit">Apply</Button>
        <Button type="reset">Reset</Button>
      </div>
    </Form>
  );
}
export default FilterForm;
