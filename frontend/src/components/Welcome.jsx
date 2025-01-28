import { Link } from "react-router-dom";
export function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome</h1>
      <p>
        Welcome to the Mithui Alumni Association website, where we connect,
        share ideas, and create success stories.
      </p>

      <Link to="welcome" style={{ color: "#fcfcf7" }}>
        <span>Explore</span>
      </Link>
    </div>
  );
}
