import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../../services/apiService";

import { minutesTohours, ratingToPercentage } from "../../utils/helper";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaPlus,
  FaRegClock,
} from "react-icons/fa";

import "./Details.css";
import VideoComponent from "../../components/VideoComponent";
import { useFirestore } from "../../services/firestore";
import { useAuth } from "../../context/authProvider";

const DetailsPage = () => {
  const { user } = useAuth();
  const { type, id } = useParams();
  const { addToWatchlist, checkIfInWatchlist } = useFirestore();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const handleSaveToWatchlist = async () => {
    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    console.log("Setting to watch List", isSetToWatchlist);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  const title = details?.title || details?.name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

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
                  <span>User Score:</span>
                  <span className="score">
                    <div className={"circle-score"}>
                      {ratingToPercentage(details.vote_average)}%
                    </div>
                  </span>

                  <button
                    className={`watchlist-btn ${isInWatchlist ? "in" : ""}`}
                    onClick={handleSaveToWatchlist}
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
          <div className="main-item">
            {video && <VideoComponent id={video.key} />}
          </div>
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
    </>
  );
};

export default DetailsPage;
