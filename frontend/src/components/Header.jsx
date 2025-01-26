import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../images/header-logo.png";
import menuIcon from "../images/menu-icon.svg";

export function Header() {
  const [isOpen, setisOpen] = useState(false);
  const toggleMenuList = () => {
    setisOpen(!isOpen);
  };
  return (
    <header>
      <div className="small-screens">
        <div onClick={toggleMenuList} className="menu-icon-container">
          <img src={menuIcon} />
          <div className={`menu-items ${isOpen ? "active" : ""}`}>
            <Link to="/about" className="about">
              <p>About</p>
            </Link>
            <Link to="gallery" className="gallery">
              <p>Gallery</p>
            </Link>
            <Link to="news" className="news">
              <p>News</p>
            </Link>
            <Link to="events" className="events">
              <p>Events</p>
            </Link>
            <Link to="results" className="login">
              <p>Results</p>
            </Link>
            <Link to="projects" className="login">
              <p>Projects</p>
            </Link>
          </div>
        </div>
        <div className="mithiu-logo">
          <img src={logo} />
        </div>
        <div className="logins">
          <Link to="login" className="login">
            <p>Login</p>
          </Link>
          <Link to="register" className="cta-button">
            <span>Register</span>
          </Link>
        </div>
      </div>
      <div className="large-screens">
        <div>
          <img src={logo} />
        </div>
        <div className="left-header">
          <Link to="/about" className="about">
            <p>About</p>
          </Link>
          <Link to="gallery" className="gallery">
            <p>Gallery</p>
          </Link>
          <Link to="news" className="news">
            <p>News</p>
          </Link>
          <Link to="events" className="events">
            <p>Events</p>
          </Link>
          <Link to="results" className="login">
            <p>Results</p>
          </Link>
          <Link to="projects" className="login">
            <p>Projects</p>
          </Link>
          <Link to="login" className="login">
            <p>Login</p>
          </Link>
          <Link to="register" className="cta-button">
            <span>Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
