import { Link } from "react-router-dom";
import { imagePath } from "../../services/apiService";
import "./ImageCard.css";
import { FaStar } from "react-icons/fa";

const ImageCard = ({ card, type }) => {
  return (
    <Link to={`/${type}/${card.id}`} className="card">
      <div className="card-wrapper">
        <img
          src={`${imagePath}/${card?.poster_path}`}
          alt={card?.title || card?.name}
          className="card-image"
        />

        <div className="card-overlay">
          <p className="card-title">{card?.title || card?.name}</p>
          <p className="card-year">
            {new Date(
              card?.release_date || card?.first_air_date
            ).getFullYear() || "N/A"}
          </p>
          <div className="card-rating">
            <FaStar className="icon" />{" "}
            <span>{card?.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
