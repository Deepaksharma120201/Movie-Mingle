import { useEffect, useState } from "react";
import { searchData } from "../../services/apiService";
import ImageCard from "../../components/ImageCard/ImageCard";
import PaginationComponent from "../../components/Pagination/Pagination";
import "./Search.css";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!searchValue) return;
    setIsLoading(true);
    searchData(searchValue, activePage)
      .then((res) => {
        setData(res?.results || []);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
    setActivePage(1);
  };

  return (
    <div className="search">
      <div className="search-header">
        <h2 className="search-title">Search</h2>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies, tv shows..."
          value={tempSearchValue}
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
      </form>

      {isLoading && (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <h3 className="no-results">No results found</h3>
      )}

      <div className="movie-grid">
        {!isLoading &&
          data?.map((item, i) => (
            <ImageCard key={i} card={item} type={item?.media_type} />
          ))}
      </div>

      {!isLoading && data?.length > 0 && (
        <PaginationComponent
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
}

export default Search;
