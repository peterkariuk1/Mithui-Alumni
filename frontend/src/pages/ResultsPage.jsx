import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Pages.css";
import "../styles/Footer.css";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import StudentsIcon from "../images/studentsIcon.png";
import viewMoreIcon from "../images/viewmore.png";
import resultsImage from "../images/pageresults.jpg";
export function ResultsPage() {
  const [openResults, setOpenResults] = useState({}); // Object to track open states per year

  const toggleResults = (year) => {
    setOpenResults((prevState) => ({
      ...prevState,
      [year]: !prevState[year], // Toggle only for the specific year
    }));
  };

  const results = [
    {
      year: 2024,
      meanGrade: 2.54,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 1,
      gradeB: 0,
      gradeBmin: 2,
      gradeCplus: 0,
      gradeC: 1,
      gradeCmin: 1,
      gradeDplus: 7,
      gradeD: 20,
      gradeDmin: 30,
      gradeE: 18,
    },
    {
      year: 2023,
      meanGrade: 5.09,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 2,
      gradeB: 1,
      gradeBmin: 0,
      gradeCplus: 7,
      gradeC: 8,
      gradeCmin: 31,
      gradeDplus: 19,
      gradeD: 5,
      gradeDmin: 0,
      gradeE: 0,
    },
    {
      year: 2022,
      meanGrade: 4.52,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 2,
      gradeBmin: 1,
      gradeCplus: 4,
      gradeC: 5,
      gradeCmin: 14,
      gradeDplus: 22,
      gradeD: 8,
      gradeDmin: 5,
      gradeE: 0,
    },
    {
      year: 2021,
      meanGrade: 3.26,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 0,
      gradeBmin: 2,
      gradeCplus: 2,
      gradeC: 3,
      gradeCmin: 3,
      gradeDplus: 11,
      gradeD: 23,
      gradeDmin: 24,
      gradeE: 1,
    },
    {
      year: 2020,
      meanGrade: 3.2,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 0,
      gradeBmin: 0,
      gradeCplus: 2,
      gradeC: 5,
      gradeCmin: 5,
      gradeDplus: 12,
      gradeD: 15,
      gradeDmin: 27,
      gradeE: 2,
    },
    {
      year: 2019,
      meanGrade: 4,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 1,
      gradeB: 1,
      gradeBmin: 3,
      gradeCplus: 1,
      gradeC: 6,
      gradeCmin: 10,
      gradeDplus: 11,
      gradeD: 13,
      gradeDmin: 13,
      gradeE: 3,
    },
    {
      year: 2018,
      meanGrade: 4.06,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 2,
      gradeBmin: 0,
      gradeCplus: 4,
      gradeC: 6,
      gradeCmin: 7,
      gradeDplus: 3,
      gradeD: 12,
      gradeDmin: 13,
      gradeE: 0,
    },
    {
      year: 2017,
      meanGrade: 3.64,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 0,
      gradeBmin: 0,
      gradeCplus: 1,
      gradeC: 3,
      gradeCmin: 4,
      gradeDplus: 13,
      gradeD: 6,
      gradeDmin: 8,
      gradeE: 1,
    },
    {
      year: 2016,
      meanGrade: 4.37,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 3,
      gradeBmin: 2,
      gradeCplus: 3,
      gradeC: 5,
      gradeCmin: 6,
      gradeDplus: 7,
      gradeD: 9,
      gradeDmin: 11,
      gradeE: 0,
    },
    {
      year: 2015,
      meanGrade: 6.29,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 1,
      gradeB: 1,
      gradeBmin: 4,
      gradeCplus: 3,
      gradeC: 9,
      gradeCmin: 8,
      gradeDplus: 2,
      gradeD: 0,
      gradeDmin: 0,
      gradeE: 0,
    },
    {
      year: 2014,
      meanGrade: 23.4,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 3,
      gradeBmin: 4,
      gradeCplus: 6,
      gradeC: 9,
      gradeCmin: 4,
      gradeDplus: 1,
      gradeD: 0,
      gradeDmin: 0,
      gradeE: 0,
    },
    {
      year: 2013,
      meanGrade: 4.62,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 0,
      gradeBmin: 3,
      gradeCplus: 4,
      gradeC: 6,
      gradeCmin: 9,
      gradeDplus: 12,
      gradeD: 10,
      gradeDmin: 3,
      gradeE: 4,
    },
    {
      year: 2012,
      meanGrade: 5.33,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 1,
      gradeB: 2,
      gradeBmin: 1,
      gradeCplus: 7,
      gradeC: 2,
      gradeCmin: 4,
      gradeDplus: 8,
      gradeD: 7,
      gradeDmin: 0,
      gradeE: 0,
    },
    {
      year: 2011,
      meanGrade: 4.69,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 1,
      gradeB: 4,
      gradeBmin: 1,
      gradeCplus: 3,
      gradeC: 3,
      gradeCmin: 1,
      gradeDplus: 7,
      gradeD: 11,
      gradeDmin: 5,
      gradeE: 0,
    },
    {
      year: 2010,
      meanGrade: 4.14,
      gradeA: "N/A",
      gradeAmin: "N/A",
      gradeBplus: "N/A",
      gradeB: "N/A",
      gradeBmin: "N/A",
      gradeCplus: "N/A",
      gradeC: "N/A",
      gradeCmin: "N/A",
      gradeDplus: "N/A",
      gradeD: "N/A",
      gradeDmin: "N/A",
      gradeE: "N/A",
    },
    {
      year: 2009,
      meanGrade: 4.09,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 2,
      gradeBmin: 1,
      gradeCplus: 4,
      gradeC: 4,
      gradeCmin: 5,
      gradeDplus: 6,
      gradeD: 13,
      gradeDmin: 11,
      gradeE: 0,
    },
    {
      year: 2008,
      meanGrade: 4.68,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 1,
      gradeB: 0,
      gradeBmin: 3,
      gradeCplus: 2,
      gradeC: 5,
      gradeCmin: 5,
      gradeDplus: 8,
      gradeD: 6,
      gradeDmin: 5,
      gradeE: 0,
    },
    {
      year: 2007,
      meanGrade: 3.72,
      gradeA: 0,
      gradeAmin: 0,
      gradeBplus: 0,
      gradeB: 0,
      gradeBmin: 0,
      gradeCplus: 1,
      gradeC: 1,
      gradeCmin: 4,
      gradeDplus: 5,
      gradeD: 12,
      gradeDmin: 2,
      gradeE: 0,
    },
  ];
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
                      <p>{result.gradeAmin}</p>
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
                      <p>{result.gradeBmin}</p>
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
                      <p>{result.gradeCmin}</p>
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
                      <p>{result.gradeDmin}</p>
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
