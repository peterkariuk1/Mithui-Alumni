import { Link } from "react-router-dom";
import { RegisterTab } from "../components/RegisterTab";
import "../styles/Pages.css";
import "../styles/Footer.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import welcPageImage from "../images/welcomepage.jpg";
import abtPageImage from "../images/aboutpage.png";
export function WelcomePage() {
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Welcome, Karibu Sana!
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
        <Link to="/welcome" style={{ textDecoration: "none" }}>
          <p>Welcome</p>
        </Link>
      </div>
      <section className="bottom">
        <div className="content-container">
          <img className="content-image" src={welcPageImage} />
          <p>
            Welcome to the Mithui Mixed Secondary School Alumni Association! At
            the heart of humanity lies an unyielding drive to improve and
            advance our lives, often through the wonders of technology and
            collective innovation. <br />
            <p>
              This unending pursuit of progress is not an individual journey—it
              is a shared endeavor, requiring collaboration, mutual support, and
              the exchange of ideas to create extraordinary success stories.
              After all, no one person holds infinite knowledge or solutions.
              Together, we achieve greatness.
            </p>
            <br /> Within our alumni community, we are dedicated to not only
            enriching our personal lives but also fostering growth and
            development within the broader community. Our vision extends beyond
            individual accomplishments to a collective effort aimed at making a
            lasting impact.
            <p>
              Change begins at home—by strengthening our local communities and
              creating meaningful opportunities. From there, we can extend our
              influence to the sub-county, county, and eventually, the world.
              This transformative journey is not achieved in a single day,
              month, or even year; it requires unwavering determination, shared
              goals, and the power of unity. The purpose of this website is to
              serve as a dynamic hub for seamless communication among
              association members.
            </p>
            <br />
            It is a platform designed to promote the free flow of information,
            enabling us to share ideas, collaborate on initiatives, and work
            towards a common purpose. Whether it’s the pursuit of personal
            aspirations or the achievement of collective milestones, this
            website is our digital gateway to success. Together, we can
            fast-track our dreams, empower one another, and create a legacy that
            inspires generations to come.
          </p>
        </div>
        <h1>Our Purpose at a Glance</h1>

        <div className="purpose-welcome-container">
          <div>
            <h1>OUR VISION</h1>
            <p>
              Create a dynamic alumni network that inspires lifelong learning,
              fosters innovation, and drives sustainable community
              transformation, empowering members to shape a better future for
              all.
            </p>
          </div>
          <div>
            <h1>OUR OBJECTIVE</h1>
            <p>
              Unite alumni through a platform that facilitates collaboration,
              communication, and knowledge exchange, enabling members to achieve
              personal excellence while uplifting local and global communities.
            </p>
          </div>
          <div>
            <h1>OUR MISSION</h1>
            <p>
              Provide resources and opportunities that promote meaningful
              connections, accelerate individual and collective growth, and
              achieve impactful projects that benefit the alumni and the wider
              society.
            </p>
          </div>
        </div>
        <RegisterTab />
        <h1>Discover our story, values, and the vision that unites us.</h1>
        <div className="content--container">
          <img className="content--image" src={abtPageImage} />
          <p>
            Mithui Mixed Secondary School is a public sub-county school located
            in Rachuonyo South sub-county, Homabay County. Situated
            approximately 3.5 km from Oyugis, the school is accessible via the
            Oyugis-Gamba road.
            <br />
            <div>
              Find Us
              <Link>
                <p>Link to the map</p>
              </Link>
            </div>
            Established in 2004 through a partnership between the local
            government and the community, Mithui has grown into a center of
            academic excellence. The local government played a key role in
            developing infrastructure, while the community contributed land and
            other resources to support its foundation.
            <p>
              Under the leadership of the founding Principal, Mr. Gerishon Obala
              Otilah, the school saw its pioneer students sit for their KCSE
              examinations in 2007. Since then, multiple cohorts have graduated,
              with many alumni excelling in various professional fields. Mithui
              continues to nurture students, equipping them with knowledge and
              values that empower them to make a meaningful impact in society.
            </p>
          </p>
        </div>
      </section>
    </div>
  );
}
