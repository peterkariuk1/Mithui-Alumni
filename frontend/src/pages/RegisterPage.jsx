import SVGAnimation from "../images/undraw_profile_details_re_ch9r.svg";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc} from "firebase/firestore"; // Add Firestore imports
import { useState } from "react";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        createdAt: new Date(),
        uid: user.uid
      });
      
      alert("Account created successfully");
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
          <h2>Welcome!</h2>
          <p className="login-instruction">Create your account</p>
          <div className="username-container">
            <p>Email</p>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="password-container">
            <p>Password</p>
            <input className="password-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className="login-button" type="submit">
            <p>Sign Up</p>
          </button>
          <p className="sign-up-instructions">
            Already have an account?<Link style={{textDecoration:'none'}}to="/login"> Log In</Link>
          </p>
        </div>
      </form>
      <div className="right-section">
        <img src={SVGAnimation} />
      </div>
    </section>
  );
}
