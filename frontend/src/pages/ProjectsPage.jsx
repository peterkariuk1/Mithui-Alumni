import { Link } from "react-router-dom";
import "../styles/Pages.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import projectsImage from "../images/pageprojects.jpg";
export function ProjectsPage() {
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Building a brighter future, one project at a time.
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
        <Link to="/projects" style={{ textDecoration: "none" }}>
          <p>Projects</p>
        </Link>
      </div>
      <section className="bottom-projects">
        <div className="projects-content-container">
          <img className="projects-image" src={projectsImage} />
          <p className="upper-text-projects">
            At Mithui Mixed Secondary School, we believe that progress is driven
            by action. Our projects reflect the dedication and collaborative
            spirit of our alumni, students, and the wider community. Each
            initiative is a step toward making a lasting impact—whether through
            infrastructure development, mentorship programs, or academic
            support. From small-scale efforts to larger transformative projects,
            our goal is to uplift the school, empower students, and extend
            positive change beyond our institution. This platform showcases
            ongoing and completed projects, fostering transparency, engagement,
            and opportunities for alumni to contribute. Together, we turn ideas
            into reality, ensuring that every project strengthens the foundation
            of excellence and service at Mithui.
          </p>
        </div>
        <h1>Hello</h1>
      </section>
    </div>
  );
}
