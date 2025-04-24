import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../../services/apiService";

import VideoComponent from "../../components/VideoComponent";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "../../utils/helper";

// import { useFirestore } from "../../services/firebase";
import "./Details.css";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaPlus,
  FaRegClock,
} from "react-icons/fa";

const DetailsPage = () => {
  const { type, id } = useParams();
  // const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
  //   useFirestore();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);
        setDetails(detailsData);
        setCast(creditsData?.cast?.slice(0, 10));
        const video = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(video);
        const videos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <div className="details-page">
      <div
        className="details-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`,
        }}
      >
        <div className="details-content">
          <img
            src={`${imagePath}/${details.poster_path}`}
            alt={title}
            className="poster"
          />
          <div className="meta">
            <h1>
              {title}
              <span className="year">
                ({new Date(releaseDate).getFullYear()})
              </span>
            </h1>
            <div className="meta-info">
              <div className="release-info">
                <span className="year">
                  <FaCalendarAlt className="icons" />
                  {new Date(releaseDate).toLocaleDateString("en-US")}
                </span>
                {type === "movie" && (
                  <span>
                    <FaRegClock className="icons" />{" "}
                    {minutesTohours(details.runtime)}
                  </span>
                )}
              </div>
              <div className="user-score">
                <span className="score">
                  <div
                    className={`circle-score ${resolveRatingColor(
                      details.vote_average
                    )}`}
                  >
                    {ratingToPercentage(details.vote_average)}%
                  </div>
                </span>

                <button
                  className={`watchlist-btn ${isInWatchlist ? "in" : ""}`}
                >
                  {isInWatchlist ? (
                    <FaCheckCircle className="icons" />
                  ) : (
                    <FaPlus className="icons" />
                  )}
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </button>
              </div>
            </div>
            <p className="tagline">{details.tagline}</p>
            <h2>Overview</h2>
            <p>{details.overview}</p>
            <div className="genres">
              {details.genres?.map((g) => (
                <span className="genre" key={g.id}>
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-list">
          {cast.length === 0 ? (
            <p>No cast info</p>
          ) : (
            cast.map((actor) => (
              <div key={actor.id} className="cast-item">
                <img
                  src={`${imagePath}/${actor.profile_path}`}
                  alt={actor.name}
                  className="cast-img"
                />
                <p>{actor.name}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="videos-section">
        <h2>Videos</h2>
        {video && <VideoComponent id={video.key} />}
        <div className="video-list">
          {videos.map((vid) => (
            <div className="video-item" key={vid.id}>
              <VideoComponent id={vid.key} small />
              <p>{vid.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
