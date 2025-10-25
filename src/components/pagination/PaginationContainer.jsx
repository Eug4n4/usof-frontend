import { INITIAL_PAGE_SIZE } from "../../features/constants";
import PageSize from "./PageSize";
import Pagination from "./Pagination";

import s from "./pagination.module.css";

function PaginationContainer({ purpose }) {
  return (
    <div className={s.pagination_container}>
      <Pagination purpose={purpose} />
      <PageSize initialSize={INITIAL_PAGE_SIZE} purpose={purpose} />
    </div>
  );
}

export default PaginationContainer;
