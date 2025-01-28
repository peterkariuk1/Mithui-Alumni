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
            <Link
              style={{ textDecoration: "none" }}
              to="about"
              className="about"
            >
              <div>
                <p>About</p>
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="gallery"
              className="gallery"
            >
              <div>
                <p>Gallery</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="news" className="news">
              <div>
                <p>News</p>
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="events"
              className="events"
            >
              <div>
                <p>Events</p>
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="results"
              className="login"
            >
              <div>
                <p>Results</p>
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to="projects"
              className="login"
            >
              <div>
                <p>Projects</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="mithiu-logo">
          <img src={logo} />
        </div>
        <div className="logins">
          <Link
            style={{ textDecoration: "none", color: "#fcfcf7" }}
            to="login"
            className="login"
          >
            <p>Login</p>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            to="register"
            className="cta-button"
          >
            <span>Register</span>
          </Link>
        </div>
      </div>
      <div className="large-screens">
        <div>
          <img src={logo} />
        </div>
        <div className="left-header">
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="/about"
              className="about"
            >
              <p>About</p>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="gallery"
              className="gallery"
            >
              <p>Gallery</p>
            </Link>
          </div>
          <div>
            <Link style={{ textDecoration: "none" }} to="news" className="news">
              <p>News</p>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="events"
              className="events"
            >
              <p>Events</p>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="results"
              className="login"
            >
              <p>Results</p>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="projects"
              className="login"
            >
              <p>Projects</p>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="login"
              className="login"
            >
              <p>Login</p>
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none" }}
              to="register"
              className="cta-button"
            >
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
