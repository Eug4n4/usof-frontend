import "../../assets/css/filter/filter.css";
import Button from "../button/Button";
import Form from "../form/Form";
import Input from "../input/Input";
function Filter() {
  return (
    <Form>
      <fieldset>
        <legend>By category</legend>
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" autoComplete="off" />
      </fieldset>
      <fieldset>
        <legend>By date</legend>
        <Input type="date" name="" id="" />
        <Input type="date" name="" id="" />
      </fieldset>
      <fieldset>
        <legend>By status</legend>
        <Input type="radio" name="option" id="active" />
        <label htmlFor="active">Active</label>
        <Input type="radio" name="option" id="inactive" />
        <label htmlFor="inactive">Inactive</label>
      </fieldset>
      <fieldset>
        <Button type="submit">Apply</Button>
        <Button type="reset">Reset</Button>
      </fieldset>
    </Form>
  );
}

export default Filter;
