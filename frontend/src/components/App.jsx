import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import { Header } from "./Header.jsx";
import { Landing } from "./Landing.jsx";
import { Sections } from "./Sections.jsx";
import { Footer } from "./Footer.jsx";
import { AboutPage } from "../pages/AboutPage.jsx";

function App() {
  return (
    <>
      <Header /> 
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
              <Sections />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </>
  );
}

export default App;
