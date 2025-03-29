import SVGAnimation from "../images/undraw_profile_details_re_ch9r.svg";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        

        if (userData.role === "admin") {
          alert("Logged in as admin");
          navigate("/admin");
        } else {
          alert("Logged in successfully");
          navigate("/");
        }
      } else {
        alert("User profile not found. Please contact support.");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <section className="login-section">
      <form onSubmit={handleSubmit}>
        <div className="left-section">
          <h1>Mithui Alumni Association</h1>
          <h2>Welcome Back!</h2>
          <p className="login-instruction">Log in to your account</p>
          <div className="username-container">
            <p>Email</p>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="password-container">
            <p>Password</p>
            <input className="password-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className="login-button">
            <p>Log In</p>
          </button>
          <p className="sign-up-instructions">
            Dont have an account?<Link style={{ textDecoration: "none" }} to="/register"> Register
            </Link>
          </p>
        </div>
      </form>
      <div className="right-section">
        <img src={SVGAnimation} />
      </div>
    </section>
  );
}
