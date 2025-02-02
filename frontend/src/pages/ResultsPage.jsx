import "../styles/Pages.css";
import "../styles/Footer.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
export function ResultsPage() {
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Celebrating milestones and achievements together.
        </div>
      </section>
      <div className="navigation-section">
        <div>
          <img src={HomeIcon} />
          <p>Home</p>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <p>Results</p>
      </div>
      <section className="bottom"></section>
    </div>
  );
}
