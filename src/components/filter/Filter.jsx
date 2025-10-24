import FilterForm from "../form/FilterForm";

function Filter({ pageChanger, pageSizer, queryChanger, query, getter }) {
  return (
    <FilterForm
      pageChanger={pageChanger}
      pageSizer={pageSizer}
      queryChanger={queryChanger}
      query={query}
      getter={getter}
    ></FilterForm>
  );
}

export default Filter;
