import Button from "../button/Button";
import FilterForm from "../form/FilterForm";
import Input from "../input/Input";

function Filter() {
  return (
    <FilterForm>
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
        <Input type="radio" name="option" id="active" checked />
        <label htmlFor="active">Active</label>
        <Input type="radio" name="option" id="inactive" />
        <label htmlFor="inactive">Inactive</label>
      </fieldset>
      <fieldset>
        <Button type="submit">Apply</Button>
        <Button type="reset">Reset</Button>
      </fieldset>
    </FilterForm>
  );
}

export default Filter;
