import { FaArrowCircleLeft } from "react-icons/fa";
import "./Player.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODgwYjdhZGVlYmIyNzg0M2Y3ZTJiM2I2M2JlZTIyYyIsIm5iZiI6MTc0NTM4Mzc3MS4wNTMsInN1YiI6IjY4MDg3MTViMjcxZWNiM2FlMDg5Y2QxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NPaf4maOe7Oj6HIv4xDvwERihLFcr7F6TWJKzbxjrvU",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[res.results.length - 1]))
      .catch((err) => console.error(err));
  });

  return (
    <div className="player">
      <FaArrowCircleLeft
        className="icons"
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
