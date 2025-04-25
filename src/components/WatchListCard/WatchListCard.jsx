import { Link } from "react-router-dom";
import { useFirestore } from "../../services/firestore";
import { useAuth } from "../../context/authProvider";
import { FaStar, FaTimes } from "react-icons/fa";
import "./WatchlistCard.css";
import { imagePath } from "../../services/apiService";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = (e) => {
    e.preventDefault();
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`} className="watchlist-card">
      <div className="watchlist-card-image">
        <img src={`${imagePath}/${item.poster_path}`} alt={item.title} />
      </div>

      <div className="watchlist-card-info">
        <h3 className="title">{item?.title || item?.name}</h3>
        <p className="year">
          {new Date(item?.release_date || item?.first_air_date).getFullYear() ||
            "N/A"}
        </p>
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{item?.vote_average?.toFixed(1)}</span>
        </div>
        <p className="overview">{item?.overview}</p>
      </div>
      <button
        className="remove-btn"
        onClick={handleRemoveClick}
        title="Remove from watchlist"
      >
        <FaTimes />
      </button>
    </Link>
  );
};

export default WatchlistCard;
