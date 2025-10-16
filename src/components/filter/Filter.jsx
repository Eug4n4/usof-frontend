import "../../assets/css/filter/filter.css";

function Filter() {
  return (
    <form className="filter_form" id="filter">
      <fieldset>
        <legend>By category</legend>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" autoComplete="off" />
      </fieldset>
      <fieldset>
        <legend>By date</legend>
        <input type="date" name="" id="" />
        <input type="date" name="" id="" />
      </fieldset>
      <fieldset>
        <legend>By status</legend>
        <input type="radio" name="option" id="active" />
        <label htmlFor="active">Active</label>
        <input type="radio" name="option" id="inactive" />
        <label htmlFor="inactive">Inactive</label>
      </fieldset>
      <fieldset>
        <button type="submit">Apply</button>
        <button type="reset">Reset</button>
      </fieldset>
    </form>
  );
}

export default Filter;
