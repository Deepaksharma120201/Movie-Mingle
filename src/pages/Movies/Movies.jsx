import { useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/Pagination";
import "./Movies.css";
import ImageCard from "../../components/ImageCard/ImageCard";
import { fetchMovies } from "../../services/apiService";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  return (
    <div className="movies">
      <div className="header">
        <h2>Discover Movies</h2>
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
        {movies &&
          movies.map((item, i) =>
            isLoading ? (
              <div className="skeleton" key={i}></div>
            ) : (
              <ImageCard key={i} card={item} type="movie" />
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

export default Movies;
