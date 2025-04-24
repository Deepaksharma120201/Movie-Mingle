import { FaSearch, FaBell, FaCaretDown } from "react-icons/fa";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useEffect, useRef } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { logout } from "../../firebase";

function Navbar() {
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
        </ul>
      </div>
      <div className="navbar-right">
        <FaSearch className="icons" />
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
