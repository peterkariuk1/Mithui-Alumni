import "../styles/Pages.css";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Footer } from "../components/Footer.jsx";

export function NewsEventsPage() {
  const [newsEvents, setNewsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageLoadingStatus = useRef({});
  
  // Function to try different URL formats for Backblaze B2
  const getAlternativeUrls = (originalUrl) => {
    const urls = [];
    
    // 1. Original URL (encoded)
    const encodedUrl = encodeURI(originalUrl.trim());
    urls.push(encodedUrl);
    
    // 2. Try direct Backblaze download URL format with correct server (f005)
    if (encodedUrl.includes('backblazeb2.com')) {
      const filePath = encodedUrl.split('/file/mithui-images/')[1];
      if (filePath) {
        // Standard Backblaze download URL - note the f005 server!
        urls.push(`https://f005.backblazeb2.com/file/mithui-images/${filePath}`);
      }
    }
    
    // 3. Try removing any URL parameters
    if (encodedUrl.includes('?')) {
      urls.push(encodedUrl.split('?')[0]);
    }
    
    // 4. Try the S3-compatible URL format
    if (encodedUrl.includes('/news-events/')) {
      const fileName = encodedUrl.split('/').pop();
      if (fileName) {
        urls.push(`https://mithui-images.s3.us-east-005.backblazeb2.com/news-events/${fileName}`);
      }
    }
    
    // Return unique URLs only
    return [...new Set(urls)];
  };
  
  // Function to normalize Backblaze URLs
  const normalizeBackblazeUrl = (url) => {
    try {
      // First, make sure it's a valid URL string
      if (!url || typeof url !== 'string') return '';
      
      // Clean and encode the URL properly
      url = url.trim();
      
      // Correct server is f005, not f002
      if (url.includes('backblazeb2.com')) {
        // If it's already using f005, leave it alone
        if (url.includes('f005.backblazeb2.com')) {
          return url;
        }
        
        // If it's using the wrong server (f002), fix it
        if (url.includes('f002.backblazeb2.com')) {
          return url.replace('f002.backblazeb2.com', 'f005.backblazeb2.com');
        }
        
        // Extract the file path portion for other cases
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
        // Create a query to fetch news/events ordered by timestamp (newest first)
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
          
          // Validate and fix imageUrl before adding to the array
          if (data.imageUrl) {
            // Fix the URL first
            const normalizedUrl = normalizeBackblazeUrl(data.imageUrl);
            // Get alternative formats
            const urlsToTry = getAlternativeUrls(normalizedUrl);
            
            console.log(`Document ${doc.id} - URLs to try:`, urlsToTry);
            
            newsEventsData.push({
              id: doc.id,
              ...data,
              originalImageUrl: data.imageUrl,
              imageUrl: normalizedUrl, // Use normalized URL as primary
              alternativeUrls: urlsToTry.filter(url => url !== normalizedUrl), // Keep others as backup
              timestamp: data.timestamp?.toDate() || new Date()
            });
            
            // Initialize loading status for this image
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
  
  // Handle image load success
  const handleImageLoad = (item) => {
    console.log(`Image loaded successfully for item ${item.id}`);
    if (imageLoadingStatus.current[item.id]) {
      imageLoadingStatus.current[item.id].loaded = true;
    }
  };
  
  // Handle image load failure - try alternative URLs
  const handleImageError = (e, item) => {
    const status = imageLoadingStatus.current[item.id];
    console.error(`Error loading image for item ${item.id}: ${item.imageUrl}`);
    console.log(`Original URL was: ${item.originalImageUrl}`);
    
    if (status && !status.loaded && status.currentUrlIndex < status.urls.length - 1) {
      // Try the next URL format
      status.currentUrlIndex++;
      const nextUrl = status.urls[status.currentUrlIndex];
      console.log(`Trying alternative URL for ${item.id}: ${nextUrl}`);
      e.target.src = nextUrl;
    } else {
      // If all URLs failed or no alternatives, use placeholder
      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
      
      // For debugging - link to test the image directly
      console.log(`Direct link to test in browser: ${item.originalImageUrl}`);
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
              <div key={item.id} className="poster-item">
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
                      display: 'block', // Helps avoid layout issues
                      margin: '0 auto' // Center the image
                    }}
                    loading="lazy" // Improve performance with lazy loading
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
