import "../styles/Pages.css";
import "../styles/Footer.css";
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
          <p>Home</p>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <p>News & Events</p>
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
