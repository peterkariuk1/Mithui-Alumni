import { Link } from "react-router-dom";
import visionLogo from "../images/vision-logo.png";
import missionLogo from "../images/mission-logo.png";
import objectiveLogo from "../images/objective-logo.png";


export function Landing() {
  return (
    <>
      <section className="landing-page">
        <p>
          A core foundation group for all the ones who sat and learned the
          meaning and purpose of education. <span>Strive to excel</span>
        </p>
        <div className="registration-banner"></div>
      </section>
      <div className="purpose-container">
        <div className="vision-container">
          <div>
            <img src={visionLogo} />
          </div>
          <section className="purpose-text">
            <h1>Vision</h1>
            <p>
              To create a united alumni community that drives personal growth,
              community development, and global impact through collaboration and
              innovation.
            </p>
            <Link to="welcome" style={{ textDecoration: "none" }}>
              {" "}
              <span>Read more...</span>
            </Link>
          </section>
        </div>
        <div className="mission-container">
          <div>
            <img src={missionLogo} />
          </div>
          <section className="purpose-text">
            <h1>Mission</h1>
            <p>
              To foster seamless communication and idea-sharing among alumni,
              enabling collective progress and the achievement of meaningful
              goals.
            </p>
            <Link to="welcome" style={{ textDecoration: "none" }}>
              {" "}
              <span>Read more...</span>
            </Link>{" "}
          </section>
        </div>
        <div className="objective-container">
          <div>
            <img src={objectiveLogo} />
          </div>
          <section className="purpose-text">
            <h1>Objective</h1>
            <p>
              Enable the free flow of ideas and opportunities that drive
              personal growth and community development
            </p>
            <Link style={{ textDecoration: "none" }} to="welcome">
              {" "}
              <span>Read more...</span>
            </Link>{" "}
          </section>
        </div>
      </div>
      
    </>
  );
}
