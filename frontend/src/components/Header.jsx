import {Link} from 'react-router-dom'
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
            <Link className="about">
              <p>About</p>
            </Link>
            <div className="gallery">
              <p>Gallery</p>
            </div>
            <div className="news">
              <p>News</p>
            </div>
            <div className="events">
              <p>Events</p>
            </div>
            <div className="login">
              <p>Results</p>
            </div>
            <div className="login">
              <p>Projects</p>
            </div>
          </div>
        </div>
        <div className="mithiu-logo">
          <img src={logo} />
        </div>
        <div className="logins">
          <div className="login">
            <p>Login</p>
          </div>
          <div className="cta-button">
            <span>Register</span>
          </div>
        </div>
      </div>
      <div className="large-screens">
        <div>
          <img src={logo} />
        </div>
        <div className="left-header">
          <Link to='/about' className="about">
            <p>About</p>
          </Link>
          <div className="gallery">
            <p>Gallery</p>
          </div>
          <div className="news">
            <p>News</p>
          </div>
          <div className="events">
            <p>Events</p>
          </div>
          <div className="login">
            <p>Results</p>
          </div>
          <div className="login">
            <p>Projects</p>
          </div>
          <div className="login">
            <p>Login</p>
          </div>
          <div className="cta-button">
            <span>Register</span>
          </div>
        </div>
      </div>
    </header>
  );
}
