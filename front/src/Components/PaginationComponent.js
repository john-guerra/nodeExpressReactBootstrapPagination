export default function PaginationComponent({ page, onChangePage, total }) {
  let numPages = 6;
  let minPageInRange = Math.max(0, page - numPages / 2);
  let lastPage = Math.floor(total / 20) - 1;
  let maxPageInRange = Math.min(minPageInRange + numPages, lastPage);

  const renderPages = () => {
    let pages = [];

    for (let i = minPageInRange; i <= maxPageInRange; i += 1) {
      pages.push(
        <li
          key={"page" + i}
          className={"page-item" + (page === i ? " active" : "")}
        >
          <button className="page-link" onClick={() => onChangePage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => onChangePage(0)}>
            First
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={() => onChangePage(page - 1)}>
            Previous
          </button>
        </li>

        {renderPages()}

        <li className="page-item">
          <button className="page-link" onClick={() => onChangePage(page + 1)}>
            Next
          </button>
        </li>

        <li className="page-item">
          <button className="page-link" onClick={() => onChangePage(lastPage)}>
            Last ({lastPage})
          </button>
        </li>
      </ul>
    </nav>
  );
}
