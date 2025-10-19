import PageSize from "./PageSize";
import Pagination from "./Pagination";

function PaginationContainer({ purpose }) {
  return (
    <div className="pagination_container">
      <Pagination purpose={purpose} />
      <PageSize initialSize={5} purpose={purpose} />
    </div>
  );
}

export default PaginationContainer;
