import { Link } from "react-router-dom";
import "../styles/Footer.css";
import mithuiLogo from "../images/header-logo.png";
import fbLogo from "../images/facebook.png";
import wappLogo from "../images/whatsapp.png";
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
          <Link
            to="https://chat.whatsapp.com/Jz2Vqs0rDsA0I6f8xw1GnD "
            target="_blank"
          >
            <img src={wappLogo} />
          </Link>
          <Link to="https://www.linkedin.com/in/mithui-highschool-047b53312/">
            <img src={lndLogo} />
          </Link>
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
          to="https://maps.app.goo.gl/BbLjpb2BYCeLW1Yw5"
          target="_blank"
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
        <a
          style={{ textDecoration: "none", color: "#fcfcf7" }}
          href="mailto:mithuihighschool@gmail.com?subject=Welcome%20to%20our%20community%21&body=We%20truly%20value%20your%20feedback%2C%20insights%2C%20and%20thoughts%20-%20feel%20free%20to%20share%20them%20with%20us."
        >
          <div>
            <img src={mailLogo} />
            <p>mithuihighschool@gmail.com</p>
          </div>
        </a>
        <a
          style={{ textDecoration: "none", color: "#fcfcf7" }}
          href="tel:+254790416657"
        >
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
