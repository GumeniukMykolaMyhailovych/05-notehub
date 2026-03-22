import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <div className={css.pagination}>
      {/* ← */}
      <button
        className={`${css.button} ${css.arrow}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {/* pages */}
      {Array.from({ length: pageCount }, (_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            className={`${css.button} ${
              currentPage === page ? css.active : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      {/* → */}
      <button
        className={`${css.button} ${css.arrow}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;