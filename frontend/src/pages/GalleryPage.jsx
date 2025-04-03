import "../styles/Pages.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeIcon from "../images/homeicon.png";
import clickIcon from "../images/hover.png";
import RightIcon from "../images/righticon.svg";
import { collection, getDocs, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Footer } from "../components/Footer.jsx";

import jamesJuma from "../images/jamesjuma.jpg";
import lucyOoko from "../images/lucyouko.jpg";
import mrGerishon from "../images/mrgerishon.jpg";
import georgeBongo from "../images/georgeBongo.jpg";
import lorineNyaoke from "../images/lorineNyaoke.jpg";
import peterOngudu from "../images/maxwellAzeda.jpg";
import maxwellAzeda from "../images/maxwellAzedaRight.jpg";
import nicholasOlela from "../images/nicholasOlela.jpg";
import dolphineOkoth from "../images/dolphineokoth.jpg";

export function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleting, setDeleting] = useState({});

  const normalizeBackblazeUrl = (url) => {
    try {
      if (!url || typeof url !== "string") return "";
      url = url.trim();
      if (url.includes("backblazeb2.com")) {
        if (url.includes("f005.backblazeb2.com")) {
          return url;
        }
        if (url.includes("f002.backblazeb2.com")) {
          return url.replace("f002.backblazeb2.com", "f005.backblazeb2.com");
        }
        const parts = url.split("/file/mithui-images/");
        if (parts.length === 2) {
          return `https://f005.backblazeb2.com/file/mithui-images/${encodeURI(
            parts[1]
          )}`;
        }
      }
      return encodeURI(url);
    } catch (e) {
      console.error("Error normalizing URL:", e);
      return url;
    }
  };

  const handleImageError = (e, item) => {
    console.error(`Error loading gallery image for item ${item.id}`);
    e.target.src =
      "https://via.placeholder.com/300x200?text=Image+Not+Available";
  };

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const q = query(
          collection(db, "galleryImages"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No gallery images found in Firestore");
          setGalleryImages([]);
          return;
        }
        const galleryData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.imageUrl) {
            const normalizedUrl = normalizeBackblazeUrl(data.imageUrl);
            galleryData.push({
              id: doc.id,
              imageUrl: normalizedUrl,
              caption: data.caption || "",
              timestamp: data.timestamp?.toDate() || new Date(),
            });
          } else {
            console.warn(`Gallery document ${doc.id} missing imageUrl:`, data);
          }
        });
        setGalleryImages(galleryData);
        console.log("Fetched gallery images:", galleryData.length);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setError("Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const checkAdminStatus = async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, checkAdminStatus);
    return () => unsubscribe();
  }, []);

  const handleDeleteImage = async (item) => {
    if (!window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(prev => ({ ...prev, [item.id]: true }));
    
    try {
      await deleteDoc(doc(db, "galleryImages", item.id));
      
      let fileName;

      if (item.fileName) {
        fileName = item.fileName;
      } 
      else if (item.imageUrl) {
        if (item.imageUrl.includes('/file/mithui-images/')) {
          const parts = item.imageUrl.split('/file/mithui-images/');
          if (parts.length > 1) {
            fileName = parts[1];
          }
        } else {
          const parts = item.imageUrl.split('/');
          fileName = parts.length > 0 ? parts.pop() : null;
        }
      }
      
      if (fileName) {
        console.log("Deleting from B2:", fileName);
        
        try {
          const response = await fetch('http://localhost:3001/api/delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName })
          });

          let errorMsg = `Server error: ${response.status}`;
          
          if (!response.ok) {
            try {
              const contentLength = response.headers?.get('content-length');
              if (contentLength && parseInt(contentLength) > 0) {
                try {
                  const errorData = await response.json();
                  if (errorData && errorData.message) {
                    errorMsg += ` - ${errorData.message}`;
                  }
                } catch (e) {
                  console.error("Failed to parse error response:", e);
                  
                  try {
                    const textResponse = await response.text();
                    if (textResponse) {
                      errorMsg += ` - ${textResponse}`;
                    }
                  } catch (textError) {
                    console.error("Failed to get response text:", textError);
                  }
                }
              }
              
              throw new Error(errorMsg);
            }
            catch (parseError) {
              console.error("Error parsing response:", parseError);
              throw new Error(errorMsg);
            }
          }
          
          let data = { success: true };
          try {
            const contentLength = response.headers?.get('content-length');
            if (contentLength && parseInt(contentLength) > 0) {
              data = await response.json();
            }
          } catch (e) {
            console.warn("Response not JSON, but operation likely succeeded:", e);
          }

          console.log("B2 delete response:", data);

          setGalleryImages(prevImages => prevImages.filter(img => img.id !== item.id));
          
          console.log('Image successfully deleted from database and storage');
        } catch (fetchError) {
          console.error("Network error:", fetchError);
          throw new Error(`Network error: ${fetchError.message || 'Unknown network error'}`);
        }
      } else {
        console.warn("No valid filename found for B2 deletion");
      }
      
    } catch (error) {
      console.error("Error deleting image:", error);
      alert(`Error deleting image: ${error.message}`);
    } finally {
      setDeleting(prev => ({ ...prev, [item.id]: false }));
    }
  };

  const galleryItems = [
    {
      image: jamesJuma,
      name: "James Juma",
      title: "First president elect",
      text: "Juma took over the office from David Abong' who was the Interim President overseeing the association activities before formal elections were held.",
    },
    {
      image: lucyOoko,
      name: "Lucy Ooko",
      title: "Vice President of the Association 2022 - 2024",
      text: "Class of 2014",
    },
    {
      image: mrGerishon,
      name: "Mr. Gerishon Obalah Otilah",
      title: "First Principal - Mithui Mixed Secondary School",
      text: "",
    },
    {
      image: georgeBongo,
      name: "George Bongo ",
      title: "Bsc.Mathematics/Business Studies-MACHAKOS UNIVERSITY",
      text: "George, a Data Science student at Open University of Kenya, explores human migration using data-driven solutions, building on his education and research background.",
    },
    {
      image: lorineNyaoke,
      name: "Lorine Nyaoke",
      title: "Current Vice President",
      text: "Class of 2014",
    },
    {
      image: maxwellAzeda,
      name: "Maxwell Azeda",
      title: "Current Organising Secretary",
      text: "Class of 2010",
    },
    {
      image: peterOngudu,
      name: "Peter Ongudu",
      title: "Organising Secretary 2022 - 2024",
      text: "Class of 2008",
    },
    {
      image: nicholasOlela,
      name: "Nicholas Olela",
      title: "Secretary General 2022 to-date",
      text: "Class of 2010",
    },
    {
      image: dolphineOkoth,
      name: "Dolphine Okoth",
      title: "Association Treasurer 2022  to-date",
      text: "Class of 2007",
    },
  ];

  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Capture our every moment.
        </div>
      </section>
      <div className="navigation-section">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div>
            <img src={HomeIcon} alt="Home" />
            <p>Home</p>
          </div>
        </Link>
        <img style={{ height: "13px" }} src={RightIcon} alt=">" />
        <Link to="/gallery" style={{ textDecoration: "none" }}>
          <p>Gallery</p>
        </Link>
      </div>
      <section className="bottom">
        <h1>Our Leaders at a Glance</h1>
        <div className="gallery-grid">
          {galleryItems.map((item, itemIndex) => (
            <div className="gallery-item" key={itemIndex}>
              <img
                className="click-icon"
                src={clickIcon}
                alt="Click for details"
              />
              <img className="gallery-image" src={item.image} alt={item.name} />
              <div className="image-caption">
                <h1>
                  {item.name}- <span>{item.title}</span>
                </h1>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h1>Moments that Count</h1>
        {loading ? (
          <div className="loading-container">
            <p>Loading gallery images...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="fallback-gallery">No Images Added</div>
        ) : (
            <div className="gallery-grid">
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  style={{ position: 'relative' }}
                >
                  {isAdmin && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteImage(item)}
                      disabled={deleting[item.id]}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                    >
                      {deleting[item.id] ? "..." : "×"}
                    </button>
                  )}
                  <img
                    src={item.imageUrl}
                    alt={item.caption || "Gallery image"}
                    onError={(e) => handleImageError(e, item)}
                    loading="lazy"
                    className="gallery-image"
                  />
                  {item.caption && (
                    <div
                      className="image-caption-overlay"
                    >
                      <p>{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
