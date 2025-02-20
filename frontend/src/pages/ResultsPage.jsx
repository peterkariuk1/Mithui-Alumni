import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Pages.css";
import "../styles/Footer.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import loaderAnimation from "../images/loadervideo.webm";
import StudentsIcon from "../images/studentsIcon.png";
import viewMoreIcon from "../images/viewmore.png";
import resultsImage from "../images/pageresults.jpg";
import { db } from "../../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export function ResultsPage() {
  const [openResults, setOpenResults] = useState({}); // Object to track open states per year
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleResults = (year) => {
    setOpenResults((prevState) => ({
      ...prevState,
      [year]: !prevState[year], // Toggle only for the specific year
    }));
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const q = query(collection(db, "results"), orderBy("year", "desc"));
        const querySnapshot = await getDocs(q);
        const resultsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <>
        <section className="top">
          <div className="page-title-container">
            <span>|</span> Celebrating milestones and achievements together.
          </div>
        </section>
        <div className="navigation-section">
          <div>
            <img src={HomeIcon} />
            <Link to="/" style={{ textDecoration: "none" }}>
              <p>Home</p>
            </Link>
          </div>
          <img style={{ height: "13px" }} src={RightIcon} />
          <Link to="/results" style={{ textDecoration: "none" }}>
            <p>Results</p>
          </Link>
        </div>
        <div className="loader-animation">
          <video autoPlay muted loop src={loaderAnimation}></video>
          <p>Loading results please wait ...</p>
        </div>
      </>
    );
  }

  return (
    <div className="about-page">
      <section className="top">
        <div className="page-title-container">
          <span>|</span> Celebrating milestones and achievements together.
        </div>
      </section>
      <div className="navigation-section">
        <div>
          <img src={HomeIcon} />
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Home</p>
          </Link>
        </div>
        <img style={{ height: "13px" }} src={RightIcon} />
        <Link to="/results" style={{ textDecoration: "none" }}>
          <p>Results</p>
        </Link>
      </div>
      <section className="bottom-results">
        <div className="results-content-container">
          <img className="results-image" src={resultsImage} />
          <p className="upper-text-results">
            A testament to the dedication and excellence of our alumni, by
            reflecting on these results, we not only celebrate our shared legacy
            but also inspire future generations to aim higher. Explore the
            milestones that define our journey of success.
          </p>
        </div>

        <div className="all-years-container">
          {results.map((result, yearResultsIndex) => (
            <div key={yearResultsIndex} className="year-results-container">
              <h1>{result.year}</h1>
              <p className="mean-text">
                Mean Grade:<span> {result.meanGrade}</span>
              </p>

              {/* Click to toggle specific year */}
              <div
                onClick={() => toggleResults(result.year)}
                className="viewmore-container"
              >
                <p>{openResults[result.year] ? "Hide Details" : "View More"}</p>
                <img className="view-more-icon" src={viewMoreIcon} />
              </div>

              {/* Show details only if openResults for this year is true */}
              {openResults[result.year] && (
                <div className="all-grades-container">
                  <div className="grades-container">
                    <h1>A</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeA}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>A-</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeAminus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>B+</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeBplus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>B</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeB}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>B-</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeBminus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>C+</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeCplus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>C</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeC}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>C-</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeCminus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>D+</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeDplus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>D</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeD}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>D-</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeDminus}</p>
                    </div>
                  </div>
                  <div className="grades-container">
                    <h1>E</h1>
                    <div>
                      <img src={StudentsIcon} />
                      <p>{result.gradeE}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
