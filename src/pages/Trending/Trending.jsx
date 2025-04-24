import { useEffect, useState } from "react";
import { fetchTrending } from "../../services/apiService";
import ImageCard from "../../components/ImageCard/ImageCard";
import "./Trending.css";

function Trending() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  return (
    <div className="trending">
      <div className="header">
        <h2 className="title">Trending</h2>
        <div className="time-buttons">
          <button
            className={`time-button ${timeWindow === "day" ? "active" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </button>
          <button
            className={`time-button ${timeWindow === "week" ? "active" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="movie-grid">
        {data &&
          data?.map((item, i) =>
            loading ? (
              <div className="skeleton" key={i}></div>
            ) : (
              <ImageCard key={i} card={item} type={item?.media_type} />
            )
          )}
      </div>
    </div>
  );
}

export default Trending;
