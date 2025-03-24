import "../styles/Pages.css";
import {Link} from 'react-router-dom'
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import posterImage from "../images/postersample.jpg";
export function NewsEventsPage() {
  const posters = [
    {
      type:"Event",
      image: posterImage,
      text: "Join us at the Cultural Festival, presented by The ValleyCulture Team & Trinity Events, for a celebration of diverse traditions, music, dance, and heritage! 🎶🪘",
    },
    {
      type:"News",
      image: posterImage,
      text: "Join us at the Cultural Festival, presented by The ValleyCulture Team & Trinity Events, for a celebration of diverse traditions, music, dance, and heritage! 🎶🪘",
    },
    {
      type:"Event",
      image: posterImage,
      text: "Join us at the Cultural Festival, presented by The ValleyCulture Team & Trinity Events, for a celebration of diverse traditions, music, dance, and heritage! 🎶🪘",
    },
  ];
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Stay informed and inspired with our latest updates.
        </div>
      </section>
      <div className="navigation-section">
        <div>
          <img src={HomeIcon} />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Home</p>
          </Link>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <Link to="/news" style={{ textDecoration: "none" }}>
            <p>News & Events</p>
          </Link>
      </div>
      <section className="bottom">
        <div className="posters-grid">
          {posters.map((poster, posterIndex) => {
            return (
              <div key={posterIndex} className="poster-item">
                <div>
                  <img src={poster.image} />
                </div>
                <div>
                  <h1>{poster.type}</h1>
                  <p>{poster.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
