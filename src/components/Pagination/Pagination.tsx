import ReactPaginateLib from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

const ReactPaginate =
  (ReactPaginateLib as unknown as { default: typeof ReactPaginateLib }).default ||
  ReactPaginateLib;

function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(event: { selected: number }) =>
        onPageChange(event.selected + 1)
      }

      containerClassName={css.pagination}

      pageClassName={css.pageItem}
      pageLinkClassName={css.button}

      previousClassName={css.pageItem}
      previousLinkClassName={`${css.button} ${css.arrow}`}

      nextClassName={css.pageItem}
      nextLinkClassName={`${css.button} ${css.arrow}`}

      breakClassName={css.pageItem}
      breakLinkClassName={css.button}

      activeClassName={css.active}

      previousLabel="←"
      nextLabel="→"
      breakLabel="..."

      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
}

export default Pagination;