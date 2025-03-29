import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import "../styles/Pages.css";
import { auth, db } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, collection, addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { Footer } from "../components/Footer.jsx";

export function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Move all state declarations to the top level, before any conditional returns
  const [year, setYear] = useState("");
  const [mean, setMean] = useState("");
  const [gradeA, setGradeA] = useState("");
  const [gradeAminus, setGradeAminus] = useState("");
  const [gradeBplus, setGradeBplus] = useState("");
  const [gradeB, setGradeB] = useState("");
  const [gradeBminus, setGradeBminus] = useState("");
  const [gradeCplus, setGradeCplus] = useState("");
  const [gradeC, setGradeC] = useState("");
  const [gradeCminus, setGradeCminus] = useState("");
  const [gradeDplus, setGradeDplus] = useState("");
  const [gradeD, setGradeD] = useState("");
  const [gradeDminus, setGradeDminus] = useState("");
  const [gradeE, setGradeE] = useState("");

  const [newsEventImage, setNewsEventImage] = useState(null);
  const [newsEventType, setNewsEventType] = useState("News");
  const [newsEventDescription, setNewsEventDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const [galleryImage, setGalleryImage] = useState(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryCaption, setGalleryCaption] = useState("");

  // Add authentication verification in case someone bypasses the protected route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No authenticated user, redirecting to login");
        navigate("/login");
        return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists() || userDoc.data().role !== "admin") {
          console.log("User is not an admin, redirecting");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "results", year), {
        year,
        mean,
        gradeA,
        gradeAminus,
        gradeBplus,
        gradeB,
        gradeBminus,
        gradeCplus,
        gradeC,
        gradeCminus,
        gradeDplus,
        gradeD,
        gradeDminus,
        gradeE,
      });
      alert("Results added successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setYear("");
      setMean("");
      setGradeA("");
      setGradeAminus("");
      setGradeBplus("");
      setGradeB("");
      setGradeBminus("");
      setGradeCplus("");
      setGradeC("");
      setGradeCminus("");
      setGradeDplus("");
      setGradeD("");
      setGradeDminus("");
      setGradeE("");
    }
  };

  const handleNewsEventSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsEventImage || !newsEventDescription || !newsEventType) {
      alert("Please fill all fields and select an image");
      return;
    }
    
    setUploading(true);
    
    try {
      // Create form data for the file upload
      const formData = new FormData();
      formData.append('file', newsEventImage);
      
      // Upload to your B2 upload endpoint
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Upload failed');
      }
      
      // Store metadata in Firestore
      await addDoc(collection(db, "newsEvents"), {
        imageUrl: data.fileUrl,
        description: newsEventDescription,
        type: newsEventType,
        timestamp: serverTimestamp(),
        fileName: data.fileName
      });
      
      // Reset form
      setNewsEventImage(null);
      setNewsEventType("News");
      setNewsEventDescription("");
      
      alert("Published successfully!");
    } catch (error) {
      console.error("Error uploading news/event:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewsEventImage(e.target.files[0]);
    }
  };

  const handleGalleryImageChange = (e) => {
    if (e.target.files[0]) {
      setGalleryImage(e.target.files[0]);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    
    if (!galleryImage) {
      alert("Please select an image for the gallery");
      return;
    }
    
    setGalleryUploading(true);
    
    try {
      // Create form data for the file upload
      const formData = new FormData();
      formData.append('file', galleryImage);
      
      // Upload to your B2 upload endpoint
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Upload failed');
      }
      
      // Store gallery image metadata in Firestore
      await addDoc(collection(db, "galleryImages"), {
        imageUrl: data.fileUrl,
        caption: galleryCaption || '',
        timestamp: serverTimestamp(),
        fileName: data.fileName
      });
      
      // Reset form
      setGalleryImage(null);
      setGalleryCaption("");
      
      alert("Gallery image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading gallery image:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setGalleryUploading(false);
    }
  };

  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Admin Panel
        </div>
      </section>
      <div className="navigation-section">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div>
            <img src={HomeIcon} />
            <p>Home</p>
          </div>
        </Link>
        <img style={{ height: "13px" }} src={RightIcon} />
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <p>Admin</p>
        </Link>
      </div>
      <section className="admin-panel">
        <div className="results-inputs-container">
          <h1>Add Results: Results Page</h1>
          <form onSubmit={handleSubmit} className="input-results">
            <input
              type="text"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <input
              type="text"
              step="any"
              placeholder="Enter Mean Grade"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
            />
            <div className="grades-inputs-container">
              <div>
                <p>Grade A:</p>
                <input
                  type="text"
                  placeholder="Grade A"
                  value={gradeA}
                  onChange={(e) => setGradeA(e.target.value)}
                />
              </div>
              <div>
                <p>Grade A-:</p>
                <input
                  type="text"
                  placeholder="Grade A-"
                  value={gradeAminus}
                  onChange={(e) => setGradeAminus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade B+:</p>
                <input
                  type="text"
                  placeholder="Grade B+"
                  value={gradeBplus}
                  onChange={(e) => setGradeBplus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade B:</p>
                <input
                  type="text"
                  placeholder="Grade B"
                  value={gradeB}
                  onChange={(e) => setGradeB(e.target.value)}
                />
              </div>
              <div>
                <p>Grade B-:</p>
                <input
                  type="text"
                  placeholder="Grade B-"
                  value={gradeBminus}
                  onChange={(e) => setGradeBminus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade C+:</p>
                <input
                  type="text"
                  placeholder="Grade C+"
                  value={gradeCplus}
                  onChange={(e) => setGradeCplus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade C:</p>
                <input
                  type="text"
                  placeholder="Grade C"
                  value={gradeC}
                  onChange={(e) => setGradeC(e.target.value)}
                />
              </div>
              <div>
                <p>Grade C-:</p>
                <input
                  type="text"
                  placeholder="Grade C-"
                  value={gradeCminus}
                  onChange={(e) => setGradeCminus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade D+:</p>
                <input
                  type="text"
                  placeholder="Grade D+"
                  value={gradeDplus}
                  onChange={(e) => setGradeDplus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade D:</p>
                <input
                  type="text"
                  placeholder="Grade D"
                  value={gradeD}
                  onChange={(e) => setGradeD(e.target.value)}
                />
              </div>
              <div>
                <p>Grade D-:</p>
                <input
                  type="text"
                  placeholder="Grade D-"
                  value={gradeDminus}
                  onChange={(e) => setGradeDminus(e.target.value)}
                />
              </div>
              <div>
                <p>Grade E:</p>
                <input
                  type="text"
                  placeholder="Grade E"
                  value={gradeE}
                  onChange={(e) => setGradeE(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Upload Grades
            </button>
          </form>
        </div>
        <h1>Input images to the gallery grid: Gallery Page</h1>
        <div className="input-to-gallery-container">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleGalleryImageChange} 
          />
          {galleryImage && (
            <p className="file-selected">File selected: {galleryImage.name}</p>
          )}
          <input
            type="text"
            placeholder="Image caption (optional)"
            value={galleryCaption}
            onChange={(e) => setGalleryCaption(e.target.value)}
          />
          <button 
            onClick={handleGallerySubmit}
            disabled={galleryUploading}
          >
            {galleryUploading ? "Uploading..." : "Submit"}
          </button>
          <div></div>
        </div>
        <div className="publish-news-events-container">
          <h1>Publish News or Events here: News & Events Page</h1>
          <div className="publish-container">
            <p>Add an event or news poster here</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
            />
            {newsEventImage && (
              <p className="file-selected">File selected: {newsEventImage.name}</p>
            )}
            
            <div className="radio-options">
              <p>Choose between News and Event only</p>
              <label>
                <input 
                  type="radio" 
                  name="option" 
                  value="News" 
                  checked={newsEventType === "News"}
                  onChange={() => setNewsEventType("News")} 
                /> News
              </label>
              <label>
                <input 
                  type="radio" 
                  name="option" 
                  value="Event" 
                  checked={newsEventType === "Event"}
                  onChange={() => setNewsEventType("Event")} 
                /> Event
              </label>
            </div>
            
            <input
              type="text"
              placeholder="Input description of the news or event only"
              value={newsEventDescription}
              onChange={(e) => setNewsEventDescription(e.target.value)}
            />
            
            <button 
              onClick={handleNewsEventSubmit} 
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
