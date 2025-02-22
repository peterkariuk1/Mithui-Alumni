import SVGAnimation from "../images/undraw_profile_details_re_ch9r.svg";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <section className="login-section">
      <div className="left-section">
        <h1>Mithui Alumni Association</h1>
        <h2>Welcome Back!</h2>
        <p className="login-instruction">Log in to your account</p>
        <div className="username-container">
          <p>Username</p>
          <input type="text" />
        </div>
        <div className="password-container">
          <p>Password</p>
          <input className="password-input" type="password" />
        </div>
        <button className="login-button">
          <p>Log In</p>
        </button>
        <p className="sign-up-instructions">
          Dont have an account?<Link style={{ textDecoration: "none" }} to="/register"> Register
          </Link>
        </p>
      </div>
      <div className="right-section">
        <img src={SVGAnimation} />
      </div>
    </section>
  );
}
