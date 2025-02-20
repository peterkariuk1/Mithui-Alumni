import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Pages.css";
import usernameLogo from "../images/username.png";
import passwordLogo from "../images/password.png";
import seePassword from "../images/eyesee.png";
import hidePassword from "../images/eyelocked.png";
import LoginImage from "../images/loginpage.png";
import googleIcon from "../images/google.png";

export function LoginPage() {
    const [viewPassword,setViewPassword] = useState(false);

    const handleViewPassword = () => {
        setViewPassword(true);
    }
  return (
    <div className="login-register-page">
      <div className="login-section">
        <img className="login-illustration" src={LoginImage} />
        <div className="google">
          <p> Continue with Google</p>
          <img src={googleIcon} />
        </div>
        <section>
          Enter Email Adress
          <input type="username" placeholder="Enter Email Adress" />
          <img src={usernameLogo} />
        </section>
        <section>
          Enter Password
          <input type="password" placeholder="Enter Password" />
          <img src={passwordLogo} />
          <img onClick={handleViewPassword} className="hide-see-password-icon"src={{hidePassword?!viewPassword:seePassword} />
        </section>
        <p>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <span>Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
