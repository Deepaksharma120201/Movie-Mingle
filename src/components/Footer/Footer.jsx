import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-icons">
        <FaFacebook className="icon" />
        <FaInstagram className="icon" />
        <FaTwitter className="icon" />
        <FaYoutube className="icon" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">
        &copy; 1997-{new Date().getFullYear()} Netflix, Inc.
      </p>
    </div>
  );
}

export default Footer;
