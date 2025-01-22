import "../styles/App.css";
import { Header } from "./Header.jsx";
import { Landing } from "./Landing.jsx";
import { Sections } from "./Sections.jsx";
import { Footer } from "./Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <Landing />
      <Sections />
      <Footer/>
    </>
  );
}

export default App;
