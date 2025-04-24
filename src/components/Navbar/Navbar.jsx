import { FaSearch, FaBell, FaCaretDown } from "react-icons/fa";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authProvider";

function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
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
        </ul>
      </div>
      <div className="navbar-right">
        <Link to={`/search`} className="nav-link">
          <FaSearch className="icons" />
        </Link>
        <FaBell className="icons" />
        <div className="navbar-profile">
          <FaUserLarge className="icons" />
          <FaCaretDown className="icons" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign out of Netflix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
