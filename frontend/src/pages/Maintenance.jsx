import "../styles/notFound.css";
import { Link } from "react-router-dom";

const Maintenance = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">503</h1>
      <p>Welcome to Mithui Alumni Association</p>
      <p className="notfound-message">
        This site is currently under maintenance. Thank you for your patience{" "}
      </p>
      <Link to="/" className="notfound-button">
        Go Home
      </Link>
    </div>
  );
};

export default Maintenance;
