import "../styles/Pages.css";
import "../styles/Footer.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import welcPageImage from "../images/welcomepage.jpg";
export function WelcomePage() {
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Welcome, Karibu Sana!
        </div>
      </section>
      <div className="navigation-section">
        <div>
          <img src={HomeIcon} />
          <p>Home</p>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <p>Welcome</p>
      </div>
      <section className="bottom">
        <div className="content-container">
          <img className="content-image" src={welcPageImage} />
          <p>
            Welcome to the Mithui Mixed Secondary School Alumni Association
            website! At the heart of humanity lies an unyielding drive to
            improve and advance our lives, often through the wonders of
            technology and collective innovation. <br />
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
              Create a dynamic alumni network that inspires lifelong
              learning, fosters innovation, and drives sustainable community
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
      </section>
    </div>
  );
}
