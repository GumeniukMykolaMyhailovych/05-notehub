import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
  currentPage: number;
}

function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={css.pagination}>
      {/* ← КНОПКА НАЗАД */}
      <button
        className={`${css.button} ${css.arrow}`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {/* НОМЕРИ СТОРІНОК */}
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

      {/* → КНОПКА ВПЕРЕД */}
      <button
        className={`${css.button} ${css.arrow}`}
        onClick={handleNext}
        disabled={currentPage === pageCount}
      >
        →
      </button>
    </div>
  );
}

export default Pagination;