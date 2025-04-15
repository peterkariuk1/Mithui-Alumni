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

    // Step 1: Initiate Payment
    const paymentSuccessful = await initiatePayment();
    if (!paymentSuccessful) {
      alert("Payment failed! Please try again.");
      return;
    }

    // Step 2: Register User after Payment
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
      setEmail("");
      setPassword("");
      setPhone("");
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="phone-container">
            <p>Phone Number (M-PESA)</p>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="password-container">
            <p>Password</p>
            <input className="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="login-button" type="submit">
            <p>Pay KES 200 & Sign Up</p>
          </button>

          <p className="sign-up-instructions">
            Already have an account? <Link style={{ textDecoration: 'none' }} to="/login">Log In</Link>
          </p>
        </div>
      </form>
      <div className="right-section">
        <img src={SVGAnimation} alt="SVG Animation" />
      </div>
    </section>
  );
}
