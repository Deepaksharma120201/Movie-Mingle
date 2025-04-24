import { useEffect, useState } from "react";
import "./TitleCards.css";
import { fetchCategory, imagePath } from "../../services/apiService";
import ImageCard from "../ImageCard/ImageCard";
import { Link } from "react-router-dom";

function TitleCards({ title, category }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetchCategory(category ? category : "now_playing")
      .then((res) => setApiData(res))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData &&
          apiData?.map((card, index) => {
            return (
              <Link to={`/movie/${card.id}`} className="card" key={index}>
                <img
                  src={`${imagePath}/${card?.poster_path}`}
                  alt={card?.title || card?.name}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default TitleCards;
