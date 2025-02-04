import { Link } from "react-router-dom";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import "../styles/Pages.css";

export function AdminPage() {
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Admin Panel
        </div>
      </section>
      <div className="navigation-section">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div>
            <img src={HomeIcon} />
            <p>Home</p>
          </div>
        </Link>
        <img style={{ height: "13px" }} src={RightIcon} />
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <p>Admin</p>
        </Link>
      </div>
      <section className="admin-panel">
        {/* Input fields for admin to add results */}
        <div className="results-inputs-container">
          <h1>Add Results:</h1>
          <div className="input-results">
            <input type="number" placeholder="Enter Year" />
            <input type="number" placeholder="Enter Mean Grade" />
            <div className="grades-inputs-container">
              <div>
                <p>Grade A:</p>
                <input type="number" placeholder="Grade A" />
              </div>
              <div>
                <p>Grade A-:</p>
                <input type="number" placeholder="Grade A-" />
              </div>
              <div>
                <p>Grade B+:</p>
                <input type="number" placeholder="Grade B+" />
              </div>
              <div>
                <p>Grade B:</p>
                <input type="number" placeholder="Grade B" />
              </div>
              <div>
                <p>Grade B-:</p>
                <input type="number" placeholder="Grade B-" />
              </div>
              <div>
                <p>Grade C+:</p>
                <input type="number" placeholder="Grade C+" />
              </div>
              <div>
                <p>Grade C:</p>
                <input type="number" placeholder="Grade C" />
              </div>
              <div>
                <p>Grade C-:</p>
                <input type="number" placeholder="Grade C-" />
              </div>
              <div>
                <p>Grade D+:</p>
                <input type="number" placeholder="Grade D+" />
              </div>
              <div>
                <p>Grade D:</p>
                <input type="number" placeholder="Grade D" />
              </div>
              <div>
                <p>Grade D-:</p>
                <input type="number" placeholder="Grade D-" />
              </div>
              <div>
                <p>Grade E:</p>
                <input type="number" placeholder="Grade E" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
