import "../styles/Pages.css";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import { collection, getDocs, query, orderBy, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Footer } from "../components/Footer.jsx";

export function NewsEventsPage() {
  const [newsEvents, setNewsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageLoadingStatus = useRef({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleting, setDeleting] = useState({});

  const getAlternativeUrls = (originalUrl) => {
    const urls = [];

    const encodedUrl = encodeURI(originalUrl.trim());
    urls.push(encodedUrl);

    if (encodedUrl.includes('backblazeb2.com')) {
      const filePath = encodedUrl.split('/file/mithui-images/')[1];
      if (filePath) {
        urls.push(`https://f005.backblazeb2.com/file/mithui-images/${filePath}`);
      }
    }

    if (encodedUrl.includes('?')) {
      urls.push(encodedUrl.split('?')[0]);
    }
    
    if (encodedUrl.includes('/news-events/')) {
      const fileName = encodedUrl.split('/').pop();
      if (fileName) {
        urls.push(`https://mithui-images.s3.us-east-005.backblazeb2.com/news-events/${fileName}`);
      }
    }
    
    return [...new Set(urls)];
  };

  const normalizeBackblazeUrl = (url) => {
    try {

      if (!url || typeof url !== 'string') return '';

      url = url.trim();

      if (url.includes('backblazeb2.com')) {
        if (url.includes('f005.backblazeb2.com')) {
          return url;
        }
        
        if (url.includes('f002.backblazeb2.com')) {
          return url.replace('f002.backblazeb2.com', 'f005.backblazeb2.com');
        }

        const parts = url.split('/file/mithui-images/');
        if (parts.length === 2) {
          return `https://f005.backblazeb2.com/file/mithui-images/${encodeURI(parts[1])}`;
        }
      }
      
      return encodeURI(url);
    } catch (e) {
      console.error("Error normalizing URL:", e);
      return url;
    }
  };

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        const q = query(
          collection(db, "newsEvents"),
          orderBy("timestamp", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log("No news or events found in Firestore");
          setNewsEvents([]);
          return;
        }
        
        const newsEventsData = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          
          if (data.imageUrl) {
            const normalizedUrl = normalizeBackblazeUrl(data.imageUrl);
            const urlsToTry = getAlternativeUrls(normalizedUrl);
            
            console.log(`Document ${doc.id} - URLs to try:`, urlsToTry);
            
            newsEventsData.push({
              id: doc.id,
              ...data,
              originalImageUrl: data.imageUrl,
              imageUrl: normalizedUrl,
              alternativeUrls: urlsToTry.filter(url => url !== normalizedUrl),
              timestamp: data.timestamp?.toDate() || new Date()
            });

            imageLoadingStatus.current[doc.id] = {
              currentUrlIndex: 0,
              urls: [normalizedUrl, ...urlsToTry.filter(url => url !== normalizedUrl)],
              loaded: false
            };
          } else {
            console.warn(`Document ${doc.id} missing imageUrl:`, data);
          }
        });
        
        setNewsEvents(newsEventsData);
      } catch (err) {
        console.error("Error fetching news and events:", err);
        setError(`Failed to load news and events: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNewsEvents();
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

  const handleImageLoad = (item) => {
    console.log(`Image loaded successfully for item ${item.id}`);
    if (imageLoadingStatus.current[item.id]) {
      imageLoadingStatus.current[item.id].loaded = true;
    }
  };
  
  const handleImageError = (e, item) => {
    const status = imageLoadingStatus.current[item.id];
    console.error(`Error loading image for item ${item.id}: ${item.imageUrl}`);
    console.log(`Original URL was: ${item.originalImageUrl}`);
    
    if (status && !status.loaded && status.currentUrlIndex < status.urls.length - 1) {
      status.currentUrlIndex++;
      const nextUrl = status.urls[status.currentUrlIndex];
      console.log(`Trying alternative URL for ${item.id}: ${nextUrl}`);
      e.target.src = nextUrl;
    } else {
      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';

      console.log(`Direct link to test in browser: ${item.originalImageUrl}`);
    }
  };

  const handleDeleteNewsEvent = async (item) => {
    if (!window.confirm('Are you sure you want to delete this news/event? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(prev => ({ ...prev, [item.id]: true }));
    
    try {
      await deleteDoc(doc(db, "newsEvents", item.id));
      
      let fileName;
      
      if (item.fileName) {
        fileName = item.fileName;
      } else if (item.imageUrl) {
        if (item.imageUrl.includes('/file/mithui-images/')) {
          const parts = item.imageUrl.split('/file/mithui-images/');
          if (parts.length > 1) {
            fileName = parts[1];
          }
        } else if (item.imageUrl.includes('/news-events/')) {
          const match = item.imageUrl.match(/\/news-events\/([^?]+)/);
          if (match && match[1]) {
            fileName = `news-events/${match[1]}`;
          } else {
            const parts = item.imageUrl.split('/');
            fileName = parts.length > 0 ? parts.pop() : null;
          }
        } else {
          const parts = item.imageUrl.split('/');
          fileName = parts.length > 0 ? parts.pop() : null;
        }
      }
      
      console.log("Extracted fileName for deletion:", fileName);
      
      if (fileName) {
        const response = await fetch('https://mithui-backend-production.up.railway.app/api/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName })
        });

        if (!response.ok) {
          let errorMsg = `Server error: ${response.status}`;

          const contentLength = response.headers?.get('content-length');
          if (contentLength && parseInt(contentLength) > 0) {
            try {
              const errorData = await response.json();
              if (errorData && errorData.message) {
                errorMsg = errorData.message;
              }
            } catch (e) {
              console.error(e,"Failed to parse error response");
            }
          }
          
          throw new Error(errorMsg);
        }
      } else {
        console.log("No fileName could be extracted, skipping B2 deletion");
      }
      
      setNewsEvents(prevItems => prevItems.filter(i => i.id !== item.id));
      
      console.log('News/Event successfully deleted');
    } catch (error) {
      console.error("Error deleting news/event:", error);
      alert(`Error deleting news/event: ${error.message}`);
    } finally {
      setDeleting(prev => ({ ...prev, [item.id]: false }));
    }
  };
  
  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Stay informed and inspired with our latest updates.
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
        <Link to="/news" style={{ textDecoration: "none" }}>
          <p>News & Events</p>
        </Link>
      </div>
      
      <section className="bottom">
        {loading ? (
          <div className="loading-container">
            <p>Loading news and events...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : newsEvents.length === 0 ? (
          <div className="no-content-container">
            <p>No news or events to display at this time.</p>
          </div>
        ) : (
          <div className="posters-grid">
            {newsEvents.map((item) => (
              <div key={item.id} className="poster-item" style={{ position: 'relative' }}>
                {isAdmin && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteNewsEvent(item)}
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
                <div className="image-container">
                  <img 
                    src={item.imageUrl} 
                    alt={item.description || item.type}
                    onLoad={() => handleImageLoad(item)}
                    onError={(e) => handleImageError(e, item)}
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto'
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="content-container">
                  <h1>{item.type}</h1>
                  <p>{item.description}</p>
                  {item.timestamp && (
                    <small>
                      {item.timestamp.toDateString()}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
