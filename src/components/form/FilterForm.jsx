import { useContext, useState } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import f from "./filter.form.module.css";
import Form from "./Form";
import AuthContext from "../../contexts/AuthContext";
import CategoryInput from "../input/CategoryInput";
import { useDispatch } from "react-redux";
import { INITIAL_PAGE_SIZE } from "../../features/constants";
function FilterForm({ pageChanger, pageSizer, queryChanger, query, getter }) {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const initialFilters = {
    from: "",
    to: "",
    option: "active",
    categories: [],
  };
  const [filters, setFilters] = useState(initialFilters);

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function clearQueryFromFilters(query) {
    if (query.includes("status")) {
      query = query.replace(/[&\?]status=\w+/, "");
    }
    if (query.includes("startDate")) {
      query = query.replace(/[&\?]startDate=[-\d]+/, "");
    }
    if (query.includes("endDate")) {
      query = query.replace(/[&\?]endDate=[-\d]+/, "");
    }
    if (query.includes("category")) {
      query = query.replaceAll(/[&\?]category=.+/g, "");
    }
    return query;
  }

  function handleReset(e) {
    let updatedQuery = String(query);
    updatedQuery = clearQueryFromFilters(updatedQuery);
    setFilters(initialFilters);
    dispatch(pageChanger(1));
    dispatch(pageSizer(INITIAL_PAGE_SIZE));
    dispatch(getter(updatedQuery));
    dispatch(queryChanger(updatedQuery));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let updatedQuery = String(query);
    updatedQuery = clearQueryFromFilters(updatedQuery);

    updatedQuery += `${updatedQuery.length ? "&" : "?"}status=${
      filters.option
    }`;
    if (filters.from) {
      updatedQuery += `&startDate=${filters.from}`;
    }
    if (filters.to) {
      updatedQuery += `&endDate=${filters.to}`;
    }
    if (filters.categories.length) {
      for (const c of filters.categories) {
        updatedQuery += `&category=${c}`;
      }
    }
    dispatch(pageChanger(1));
    dispatch(pageSizer(INITIAL_PAGE_SIZE));
    dispatch(getter(updatedQuery));
    dispatch(queryChanger(updatedQuery));
  }
  return (
    <Form onSubmit={handleSubmit} className={f.filter_form}>
      <div className={f.filters}>
        <fieldset>
          <legend>By category</legend>
          <div>
            <label htmlFor="name">Name</label>
            <CategoryInput
              name="categories"
              value={filters.categories}
              onChange={(categories) =>
                setFilters((prev) => ({ ...prev, categories }))
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>By date</legend>
          <div>
            <Input
              type="date"
              name="from"
              id=""
              value={filters.from}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              type="date"
              name="to"
              id=""
              value={filters.to}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>By status</legend>
          <div>
            <Input
              type="radio"
              name="option"
              id="active"
              checked={filters.option === "active"}
              value="active"
              onChange={handleChange}
            />
            <label htmlFor="active">Active</label>
          </div>
          {user && (
            <div>
              <Input
                type="radio"
                name="option"
                id="inactive"
                checked={filters.option === "inactive"}
                value="inactive"
                onChange={handleChange}
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
          )}
        </fieldset>
      </div>
      <div className="filter buttons">
        <Button type="submit">Apply</Button>
        <Button type="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Form>
  );
}
export default FilterForm;
