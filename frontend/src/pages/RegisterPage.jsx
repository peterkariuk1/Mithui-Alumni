import SVGAnimation from "../images/undraw_profile_details_re_ch9r.svg";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
// import axios from "axios"; // Removed because payment is not needed

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phoneNumber, setPhone] = useState(""); // Phone number removed
  // const [showModal, setShowModal] = useState(false); // Modal removed
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Commented out the payment function
  // const initiatePayment = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3002/api/stk-push", {
  //       phoneNumber: phoneNumber,
  //       amount: 1
  //     });
  //     return response.data.success;
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     return false;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Payment part removed
    // const paymentSuccessful = await initiatePayment();
    // if (!paymentSuccessful) {
    //   alert("Payment failed! Please try again.");
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        // phoneNumber: phoneNumber, // Removed
        role: "user",
        createdAt: new Date(),
        uid: user.uid
      });

      alert("Account created successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
      setEmail("");
      setPassword("");
      // setPhone(""); // Removed
      // setShowModal(false); // Removed
    }
  };

  return (
    <section className="login-section">
      <form onSubmit={handleSubmit}>
        <div className="left-section">
          <h1>Mithui Alumni Association</h1>
          <h2>Welcome!</h2>
          <p className="login-instruction">Create your account</p>

          <div className="username-container">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone input removed */}
          {/* 
          <div className="phone-container">
            <p>Phone Number (M-PESA)</p>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Use this format +254 xxx xxx xxx"
              required
            />
          </div>
          */}

          <div className="password-container">
            <p>Password</p>
            <input
              className="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="login-button" type="submit">
            <p>{isSubmitting ? "Processing..." : "Sign Up"}</p>
          </button>

          <p className="sign-up-instructions">
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              Log In
            </Link>
          </p>
        </div>
      </form>

      <div className="right-section">
        <img src={SVGAnimation} alt="SVG Animation" />
      </div>

      {/* Modal removed */}
      {/* 
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Pay to Register</h3>
            <p>This service costs KES 200. Proceed to pay?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="modal-pay-btn"
              >
                {isSubmitting ? "Processing..." : "Pay with M-PESA"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="modal-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      */}
    </section>
  );
}
