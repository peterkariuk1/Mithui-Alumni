import logo from "../images/header-logo.png";
import menuIcon from "../images/menu-icon.svg";

export function Header() {
  return (
    <header>
      <div className="small-screens">
        <div className="menu-icon-container">
          <img src={menuIcon} />
          <div className="menu-items">
        <div className="about">
            <p>About</p>
          </div>
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
          <div className="about">
            <p>About</p>
          </div>
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
