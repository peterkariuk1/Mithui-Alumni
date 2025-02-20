import SVGAnimation from "../images/undraw_profile_details_re_ch9r.svg";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <section className="login-section">
      <div className="left-section">
        <h1>Mithui Alumni Association</h1>
        <h2>Welcome!</h2>
        <p className="login-instruction">Create your account</p>
        <div className="username-container">
          <p>Username</p>
          <input type="text" />
        </div>
        <div className="password-container">
          <p>Password</p>
          <input className="password-input" type="password" />
        </div>
        <button className="login-button">
          <p>Sign Up</p>
        </button>
        <p className="sign-up-instructions">
          Already have an account?<Link style={{textDecoration:'none'}}to="/login"> Log In</Link>
        </p>
      </div>
      <div className="right-section">
        <img src={SVGAnimation} />
      </div>
    </section>
  );
}
