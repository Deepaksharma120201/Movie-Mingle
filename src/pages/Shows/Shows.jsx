import { useEffect, useState } from "react";
import { fetchTvSeries } from "../../services/apiService";
import ImageCard from "../../components/ImageCard/ImageCard";
import PaginationComponent from "../../components/Pagination/Pagination";
import "../Movies/Movies.css";

function Shows() {
  const [shows, setShows] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTvSeries(activePage, sortBy)
      .then((res) => {
        setShows(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  return (
    <div className="movies">
      <div className="header">
        <h2 className="title">Discover TV Shows</h2>
        <select
          value={sortBy}
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </select>
      </div>

      <div className="movie-grid">
        {shows &&
          shows.map((item, i) =>
            isLoading ? (
              <div className="skeleton" key={i}></div>
            ) : (
              <ImageCard key={item?.id} card={item} type="tv" />
            )
          )}
      </div>

      <PaginationComponent
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
    </div>
  );
}

export default Shows;
