import { Link } from "react-router-dom";
export function News() {
  return (
    <div className="news-container">
      <h1>News and Events</h1>
      <p>
        Stay updated—be the first to know about our milestones, events, and
        inspiring alumni stories
      </p>
      <Link to="news" style={{ color: "#fcfcf7" }}>
        <span>Explore</span>
      </Link>
    </div>
  );
}
