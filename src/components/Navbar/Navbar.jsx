import { FaSearch, FaBell, FaCaretDown } from "react-icons/fa";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import profile_img from "../../assets/profile_img.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <FaSearch className="icons" />
        <p>Children</p>
        <FaBell className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <FaCaretDown className="icons" />
          <div className="dropdown">
            <p>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
