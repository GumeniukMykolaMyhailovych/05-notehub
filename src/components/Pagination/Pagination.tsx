import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.button}
      activeClassName={css.active}
      previousClassName={css.button}
      nextClassName={css.button}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
    />
  );
}

export default Pagination;