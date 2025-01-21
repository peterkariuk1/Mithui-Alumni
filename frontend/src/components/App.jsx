import "../styles/App.css";
import "../styles/Sections.css";
import { Header } from "./Header.jsx";
import { Landing } from "./Landing.jsx";
import { Sections } from "./Sections.jsx";

function App() {
  return (
    <>
      <Header />
      <Landing />
      <Sections />
    </>
  );
}

export default App;
