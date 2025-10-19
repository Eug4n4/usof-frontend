import PageSize from "./PageSize";
import Pagination from "./Pagination";

function PaginationContainer() {
  return (
    <div className="pagination_container">
      <Pagination />
      <PageSize />
    </div>
  );
}

export default PaginationContainer;
