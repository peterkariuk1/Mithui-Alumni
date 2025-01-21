import {Welcome} from './Welcome.jsx'
import {About} from './About.jsx'
import {FindUs} from './FindUs.jsx'
import {News} from './News.jsx'
export function Sections() {
  return (
    <div className="sections-container">
      <Welcome />
      <About />
      <FindUs />
      <News />
    </div>
  );
}
