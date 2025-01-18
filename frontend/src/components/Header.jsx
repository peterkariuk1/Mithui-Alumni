import logo from "../images/header-logo.png";

export function Header() {
  return (
    <header>
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
          <p>Login</p>
        </div>
        <div className="cta-button">
            Register
        </div>
      </div>
    </header>
  );
}
