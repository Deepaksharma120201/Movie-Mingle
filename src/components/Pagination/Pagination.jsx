import PropTypes from "prop-types";
import "./Pagination.css";

const PaginationComponent = ({ activePage, totalPages, setActivePage }) => {
  return (
    <div className="pagination-wrapper">
      <div className="button-group">
        <button
          onClick={() => setActivePage(activePage - 1)}
          disabled={activePage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setActivePage(activePage + 1)}
          disabled={activePage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="page-info">
        <span>{activePage}</span>
        <span>of</span>
        <span>{totalPages}</span>
      </div>
    </div>
  );
};

PaginationComponent.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default PaginationComponent;
