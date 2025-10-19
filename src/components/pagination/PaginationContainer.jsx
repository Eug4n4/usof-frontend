import { INITIAL_PAGE_SIZE } from "../../features/constants";
import PageSize from "./PageSize";
import Pagination from "./Pagination";

function PaginationContainer({ purpose }) {
  return (
    <div className="pagination_container">
      <Pagination purpose={purpose} />
      <PageSize initialSize={INITIAL_PAGE_SIZE} purpose={purpose} />
    </div>
  );
}

export default PaginationContainer;
