import { AuthProvider } from "../context/AuthContext.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import "../styles/App.css";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Landing } from "./Landing.jsx";
import { Sections } from "./Sections.jsx";
import { GalleryPage } from "../pages/GalleryPage.jsx";
import { NewsEventsPage } from "../pages/NewsEventsPage.jsx";
import { ResultsPage } from "../pages/ResultsPage.jsx";
import { ProjectsPage } from "../pages/ProjectsPage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { WelcomePage } from "../pages/WelcomePage.jsx";
import { AdminPage } from "../pages/AdminPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Maintenance from "../pages/Maintenance.jsx";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "*" && (
      <Header />
      )}

      <Routes>
         <Route path="/" element={<Maintenance />} /> 
         <Route
          path="/"
          element={
            <>
              <Landing />
              <Sections />
              <WelcomePage />
            </>
          }
        /> 
        <Route path="/about" element={<WelcomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/news" element={<NewsEventsPage />} />
        <Route path="/events" element={<NewsEventsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />*/}
      </Routes>

      {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "*" &&(
     <Footer />
      )}
    </AuthProvider>
  );
}

export default App;
