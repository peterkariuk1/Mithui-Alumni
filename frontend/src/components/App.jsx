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
import ProtectedRoute from "../components/ProtectedRoute.jsx"; // Add this import

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header />
      )}
      <Routes>
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
        
        {/* Protected Routes */}
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <GalleryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <NewsEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        
        {/* Admin Protected Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
