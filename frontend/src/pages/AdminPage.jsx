import { Link } from "react-router-dom";
import HomeIcon from "../images/homeicon.png";
import RightIcon from "../images/righticon.svg";
import "../styles/Pages.css";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

export function AdminPage() {
  const [year, setYear] = useState('')
  const [mean, setMean] = useState('')
  const [gradeA, setGradeA] = useState('')
  const [gradeAminus, setGradeAminus] = useState('')
  const [gradeBplus, setGradeBplus] = useState('')
  const [gradeB, setGradeB] = useState('')
  const [gradeBminus, setGradeBminus] = useState('')
  const [gradeCplus, setGradeCplus] = useState('')
  const [gradeC, setGradeC] = useState('')
  const [gradeCminus, setGradeCminus] = useState('')
  const [gradeDplus, setGradeDplus] = useState('')
  const [gradeD, setGradeD] = useState('')
  const [gradeDminus, setGradeDminus] = useState('')
  const [gradeE, setGradeE] = useState('')

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
      setYear('');
      setMean('');
      setGradeA('');
      setGradeAminus('');
      setGradeBplus('');
      setGradeB('');
      setGradeBminus('');
      setGradeCplus('');
      setGradeC('');
      setGradeCminus('');
      setGradeDplus('');
      setGradeD('');
      setGradeDminus('');
      setGradeE('');
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
        {/* Input fields for admin to add results */}
        <div className="results-inputs-container">
          <h1>Add Results:</h1>
          <form onSubmit={handleSubmit} className="input-results">
            <input type="text" placeholder="Enter Year" value={year} onChange={(e) => setYear(e.target.value)} />
            <input type="text" step="any" placeholder="Enter Mean Grade" value={mean} onChange={(e) => setMean(e.target.value)} />
            <div className="grades-inputs-container">
              <div>
                <p>Grade A:</p>
                <input type="text" placeholder="Grade A" value={gradeA} onChange={(e) => setGradeA(e.target.value)} />
              </div>
              <div>
                <p>Grade A-:</p>
                <input type="text" placeholder="Grade A-" value={gradeAminus} onChange={(e) => setGradeAminus(e.target.value)} />
              </div>
              <div>
                <p>Grade B+:</p>
                <input type="text" placeholder="Grade B+" value={gradeBplus} onChange={(e) => setGradeBplus(e.target.value)} />
              </div>
              <div>
                <p>Grade B:</p>
                <input type="text" placeholder="Grade B" value={gradeB} onChange={(e) => setGradeB(e.target.value)} />
              </div>
              <div>
                <p>Grade B-:</p>
                <input type="text" placeholder="Grade B-" value={gradeBminus} onChange={(e) => setGradeBminus(e.target.value)} />
              </div>
              <div>
                <p>Grade C+:</p>
                <input type="text" placeholder="Grade C+" value={gradeCplus} onChange={(e) => setGradeCplus(e.target.value)} />
              </div>
              <div>
                <p>Grade C:</p>
                <input type="text" placeholder="Grade C" value={gradeC} onChange={(e) => setGradeC(e.target.value)} />
              </div>
              <div>
                <p>Grade C-:</p>
                <input type="text" placeholder="Grade C-" value={gradeCminus} onChange={(e) => setGradeCminus(e.target.value)} />
              </div>
              <div>
                <p>Grade D+:</p>
                <input type="text" placeholder="Grade D+" value={gradeDplus} onChange={(e) => setGradeDplus(e.target.value)} />
              </div>
              <div>
                <p>Grade D:</p>
                <input type="text" placeholder="Grade D" value={gradeD} onChange={(e) => setGradeD(e.target.value)} />
              </div>
              <div>
                <p>Grade D-:</p>
                <input type="text" placeholder="Grade D-" value={gradeDminus} onChange={(e) => setGradeDminus(e.target.value)} />
              </div>
              <div>
                <p>Grade E:</p>
                <input type="text" placeholder="Grade E" value={gradeE} onChange={(e) => setGradeE(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn">Upload Grades</button>
          </form>
        </div>
      </section>
    </div>
  );
}