// import landingImg from '../images/landing-page-photo.png'
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
            <span>Read more...</span>
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
            <span>Read more...</span>
          </section>
        </div>
        <div className="objective-container">
          <div>
            <img src={objectiveLogo} />
          </div>
          <section className="purpose-text">
            <h1>Objective</h1>
            <p>
              Foster seamless communication among alumni, enabling the free flow
              of ideas and opportunities that drive personal growth and
              community development
            </p>
            <span>Read more...</span>
          </section>
        </div>
      </div>
    </>
  );
}
