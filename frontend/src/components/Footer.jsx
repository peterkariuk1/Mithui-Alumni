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
          <img src={fbLogo} />
          <img src={wappLogo} />
          <img src={xLogo} />
          <img src={lndLogo} />
          <img className="hand-cursor" src={handCursor} />
        </div>
      </div>
      <div className="centre">
        <h1>Useful Links</h1>
        <p>About Us</p>
        <p>News & Articles</p>
        <p>Upcoming events</p>
        <p>Find Us</p>
        <p>Results</p>
        <p>Projects</p>
        <p>Contacts</p>
      </div>
      <div className="right">
        <h1>Contact Information</h1>
        <div>
            <img src={mailLogo}/>
            <p>itspeterkariuki@gmail.com</p>
        </div>
        <div>
            <img src={phoneLogo} />
            <p>0112529019</p>
        </div>
      </div>
      <p className="rights-text">
        copyright © 2025 Mithui Alumni. All rights reserved
      </p>
    </footer>
  );
}
