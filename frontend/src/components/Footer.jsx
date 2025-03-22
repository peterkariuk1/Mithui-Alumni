import { Link } from "react-router-dom";
import "../styles/Footer.css";
import mithuiLogo from "../images/header-logo.png";
import fbLogo from "../images/facebook.png";
import wappLogo from "../images/whatsapp.png";
import xLogo from "../images/x.png";
import lndLogo from "../images/linkedin.png";
import handCursor from "../images/hand-cursor.png";
import mailLogo from "../images/gmail.png";
import phoneLogo from "../images/call.png";

export function Footer() {
  return (
    <footer>
      <div className="left">
        <div className="left-logo-name">
          <img src={mithuiLogo} />
          <h1>MITHUI ALUMNI.</h1>
        </div>
        <div className="reach-us">
          <p>
            <span>Reach </span>& Get in Touch With Us!
          </p>
        </div>
        <div className="social-logos">
          <Link to="https://www.facebook.com/share/g/1A2DuT4CsM/">
            <img src={fbLogo} />
          </Link>
          <Link to="https://wa.me/0790416657" target="_blank">
            <img src={wappLogo} />
          </Link>
          <img src={xLogo} />
          <img src={lndLogo} />
          <img className="hand-cursor" src={handCursor} />
        </div>
      </div>
      <div className="centre">
        <h1>Useful Links</h1>
        <Link to="about" style={{ color: "#fcfcf7" }}>
          <p>About Us</p>
        </Link>
        <Link to="news" style={{ color: "#fcfcf7" }}>
          <p>News & Articles</p>
        </Link>
        <Link to="events" style={{ color: "#fcfcf7" }}>
          <p>Upcoming events</p>
        </Link>
        <Link
          to="https://maps.app.goo.gl/BbLjpb2BYCeLW1Yw5" target="_blank"
          style={{ color: "#fcfcf7" }}
        >
          <p>Find Us</p>
        </Link>
        <Link to="results" style={{ color: "#fcfcf7" }}>
          <p>Results</p>
        </Link>
        <Link to="projects" style={{ color: "#fcfcf7" }}>
          <p>Projects</p>
        </Link>
        <Link to="gallery" style={{ color: "#fcfcf7" }}>
          <p>Gallery</p>
        </Link>
        <Link to="about" style={{ color: "#fcfcf7" }}>
          <p>Contacts</p>
        </Link>
      </div>
      <div className="right">
        <h1>Contact Information</h1>
        <div>
          <img src={mailLogo} />
          <p>mithuihighschool@gmail.com</p>
        </div>
        <a style={{textDecoration:'none', color:'#fcfcf7'}} href="tel:+254790416657">
        <div>
          <img src={phoneLogo} />
          <p>0790416657</p>
        </div>
          </a>
      </div>
      <Link to="/admin">
        <p className="rights-text">© 2025 Mithui Alumni.</p>
      </Link>
    </footer>
  );
}
