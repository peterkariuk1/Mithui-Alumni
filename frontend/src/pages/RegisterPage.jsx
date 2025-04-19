import SVGAnimation from "../images/undraw_profile_details_re_ch9r.svg";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import axios from "axios"; // Import Axios

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Store phone number
  const [showModal, setShowModal] = useState(false); // Show modal for payment
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit button state
  const [error, setError] = useState(""); // Store error message

  // Function to initiate payment
  const initiatePayment = async () => {
    try {
      const response = await axios.post("https://yourbackend.com/api/pay", {
        phoneNumber: phone,
        amount: 200
      });
      return response.data.success;
    } catch (error) {
      console.error("Payment error:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Validate inputs
    if (!email || !password || !phone) {
      setError("All fields are required!");
      return;
    }
    setError(""); // Reset error if validation passes

    // Step 2: Initiate Payment
    setIsSubmitting(true); // Disable button while submitting
    const paymentSuccessful = await initiatePayment();
    if (!paymentSuccessful) {
      alert("Payment failed! Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Step 3: Register User after Payment
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phone: phone,
        role: "user",
        createdAt: new Date(),
        uid: user.uid
      });

      alert("Account created successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false); // Re-enable button after submission
      setEmail("");
      setPassword("");
      setPhone("");
      setShowModal(false); // Close modal after submission
    }
  };

  return (
    <section className="login-section">
      <form onSubmit={handleSubmit}>
        <div className="left-section">
          <h1>Mithui Alumni Association</h1>
          <h2>Welcome!</h2>
          <p className="login-instruction">Pay and create your account</p>

          <div className="username-container">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="phone-container">
            <p>Phone Number (M-PESA)</p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

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

          {/* Display error message if there is one */}
          {error && <p className="error-message">{error}</p>}

          <button
            className="login-button"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <p> Sign Up</p>
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

      {/* Modal for Payment */}
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
    </section>
  );
}
