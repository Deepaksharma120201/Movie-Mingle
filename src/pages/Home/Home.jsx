import { FaInfoCircle, FaPlay } from "react-icons/fa";

import "./Home.css";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { fetchTrending, imagePathOriginal } from "../../services/apiService";
import { Link } from "react-router-dom";

function Home() {
  const [bannerMovie, setBannerMovie] = useState(null);

  useEffect(() => {
    fetchTrending()
      .then((res) => {
        if (res && res.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.length);
          setBannerMovie(res[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <img
          src={`${imagePathOriginal}/${bannerMovie?.backdrop_path}`}
          alt=""
          className="banner-img"
        />

        <div className="hero-caption">
          <div className="logo-text">
            <span className="title">
              <h1 className="caption-title">
                {bannerMovie?.title || bannerMovie?.name}
              </h1>
            </span>
          </div>
          <p>
            {bannerMovie?.overview
              ? bannerMovie.overview.length > 150
                ? bannerMovie.overview.slice(0, 150) + "..."
                : bannerMovie.overview
              : "Loading description..."}
          </p>
          <div className="hero-btns">
            <Link to={`/${bannerMovie?.media_type}/${bannerMovie?.id}`}>
              <button className="btn dark-btn">
                <FaInfoCircle className="icons" />
                More Info
              </button>
            </Link>
          </div>
          <TitleCards className={"title-cards"} />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Popular Tv-Shows"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top pics for you"} category={"top_rated"} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
