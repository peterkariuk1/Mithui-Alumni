import { Welcome } from "./Welcome.jsx";
import { About } from "./About.jsx";
import { FindUs } from "./FindUs.jsx";
import { News } from "./News.jsx";
import "../styles/Sections.css";
export function Sections() {
  return (
    <div className="sections-container">
      <Welcome />
      <About />
      <News />
      <FindUs />
    </div>
  );
}
