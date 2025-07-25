import { Link } from "react-router-dom";
import "../styles/Pages.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import memberIcon from "../images/committeeicon.jpg";
import waterTankImage from "../images/tankmithui.jpg";
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
          <p className="upper-text-projects">
            Progress is driven by action. Our projects reflect the dedication
            and collaborative spirit of our alumni, students, and the wider
            community.
            <p>
              Each initiative is a step toward making a lasting impact—whether
              through infrastructure development, mentorship programs, or
              academic support. From small-scale efforts to larger
              transformative projects, our goal is to uplift the school, empower
              students, and extend positive change beyond our institution.
            </p>
            This platform showcases ongoing and completed projects, fostering
            transparency, engagement, and opportunities for alumni to
            contribute.
          </p>
        </div>
        <div className="committees-container">
          <h1>Committees</h1>
          <div className="finance-committee">
            <h2>Association Patron</h2>
            <div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Mr. Odhiambo Aloyce</p>
              </div>
            </div>
          </div>
          <div className="finance-committee">
            <h2>Board of Trustees</h2>
            <p style={{ fontSize: "16px" }}>
              This board provides oversight and guidance on the long-term
              vision, governance, and accountability of the association. It is
              composed of experienced individuals who serve as custodians of the
              association’s mission and values.
            </p>
            <div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Dr. Mboya Geoffrey</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Nelson Odhiambo</p>
              </div>

              <div className="member-container">
                <img src={memberIcon} />
                <p>George Bongo</p>
              </div>
            </div>
          </div>
          <div className="finance-committee">
            <h2>Finance Committee</h2>
            <p style={{ fontSize: "16px" }}>
              This four-member committee is responsible for exploring financial
              sources for the association. It includes three nominated members
              and a trustee.
            </p>
            <div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Walter Kelvin</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Anthony Ouma</p>
              </div>

              <div className="member-container">
                <img src={memberIcon} />
                <p>John Kennedy</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Lency Osoro</p>
              </div>
            </div>
          </div>
          <div className="finance-committee">
            <h2>Investment Committee</h2>
            <p style={{ fontSize: "16px" }}>
              This committee focuses on strategic investments that benefit the
              association and the school community. Like the Finance Committee,
              it consists of three nominated members and a trustee.
            </p>
            <div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Seth Ouko</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Lucy Ooko</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Moses Oloo</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Evans Ouno</p>
              </div>
            </div>
          </div>
          <div className="finance-committee">
            <h2>Education Committee</h2>
            <p style={{ fontSize: "16px" }}>
              This committee is dedicated to promoting educational initiatives
              that support the academic growth of members and the wider school
              community.
            </p>
            <div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Bernard Ghai</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Jameson Oriwo</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Angela Wanga</p>
              </div>
              <div className="member-container">
                <img src={memberIcon} />
                <p>Jemima Akoth</p>
              </div>
            </div>
          </div>
          <div className="alumni-initiatives-container">
            <h1>ALUMNI INITIATIVES</h1>
            <div>
              <h2>Class Reunions</h2>
              <p>
                We encourage members from different graduating cohorts to
                organize reunions. Cohort representatives are responsible for
                coordinating these gatherings to strengthen alumni bonds.
              </p>
            </div>
            <div>
              <h2>Alumni Giving</h2>
              <p>
                Giving back is a core principle of our alumni association. We
                recognize the support we’ve received and believe in passing it
                forward. Contributions to school projects and student welfare
                programs can be made via:
                <br />
                <span>
                  Paybill: 522522
                  <br /> Account Number: 6364166
                </span>
              </p>
            </div>
          </div>
          <div className="alumni-projects-container">
            <h1>PROJECTS & IMPACT</h1>
            <div>
              <h2>
                PROJECT ALPHA: <span>Water Tank Initiative</span>
              </h2>
              <p>
                To help address the school&apos;s water shortage, alumni members
                contributed and purchased a 10,000-litre water tank as a token
                of appreciation and support for the students.
              </p>
              <div className="tank-contributions-container">
                <img src={waterTankImage} />
              </div>
            </div>
            <div>
              <h2>
                PROJECT BETA: <span> Student Sponsorship Program</span>
              </h2>
              <p>
                Through a series of fundraising events, the alumni association
                has supported students in need of financial assistance. The
                latest fundraiser was held on 9th November 2024.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
