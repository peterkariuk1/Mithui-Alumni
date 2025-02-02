import "../styles/Pages.css";
import "../styles/Footer.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
export function AboutPage() {
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Discover our story, values, and the vision that unites us.
        </div>
      </section>
      <div className="navigation-section">
        <div>
          <img src={HomeIcon} />
          <p>Home</p>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <p>About</p>
      </div>
      <section className="bottom"></section>
    </div>
  );
}
