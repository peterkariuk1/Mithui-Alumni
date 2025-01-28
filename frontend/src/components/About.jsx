import { Link } from "react-router-dom";
export function About() {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p>
        Discover who we are, where we have been, and the vision that drives us
        forward.
      </p>
      <Link to="about" style={{ textDecoration: "underline" }}>
        <span>Explore</span>
      </Link>
    </div>
  );
}
