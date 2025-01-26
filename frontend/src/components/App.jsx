import { Routes, Route } from "react-router-dom";
import "../styles/App.css";
import { Header } from "./Header.jsx";
import { Landing } from "./Landing.jsx";
import { Sections } from "./Sections.jsx";
import { Footer } from "./Footer.jsx";
import { AboutPage } from "../pages/AboutPage.jsx";
import { GalleryPage } from "../pages/GalleryPage.jsx";
import { NewsEventsPage } from "../pages/NewsEventsPage.jsx";
import { ResultsPage } from "../pages/ResultsPage.jsx";
import { ProjectsPage } from "../pages/ProjectsPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";

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
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/news" element={<NewsEventsPage />} />
        <Route path="/events" element={<NewsEventsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
