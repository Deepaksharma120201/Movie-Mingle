import { useState } from "react";
import { FaSearch, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authProvider";

import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="logo" />
          <ul>
            <li>
              <Link to={`/`} className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to={`/movies`} className="nav-link">
                Movies
              </Link>
            </li>
            <li>
              <Link to={`/shows`} className="nav-link">
                TV Shows
              </Link>
            </li>
            <li>
              <Link to={`/trending`} className="nav-link">
                Trending Now
              </Link>
            </li>
            <li>
              <Link to={`/watchlist`} className="nav-link">
                Watch List
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <Link to={`/search`} className="nav-link">
            <FaSearch className="icons" />
          </Link>
          <FaBell className="icons" />
          <div className="navbar-profile">
            <FaUserLarge className="icons" />
            <div className="dropdown">
              <p onClick={logout}>Sign out of Netflix</p>
            </div>
          </div>

          <button className="hamburger-btn" onClick={toggleDrawer}>
            <FaBars className="icons" />
          </button>
        </div>
      </div>

      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleDrawer}>
          <FaTimes />
        </button>
        <div className="drawer-links" onClick={toggleDrawer}>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/shows">TV Shows</Link>
          <Link to="/trending">Trending Now</Link>
          <Link to="/watchlist">Watch List</Link>
        </div>
      </div>

      {drawerOpen && (
        <div className="drawer-overlay" onClick={toggleDrawer}></div>
      )}
    </>
  );
}

export default Navbar;
