import React, { useState, useRef, useEffect } from "react";
import "../styles/Login.css";
import login from '../assets/login.jpeg'
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import GoogleOAuthButton from "../components/GoogleOAuthButton";
import GithubButton from "../components/GithubButton";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state to show/hide password
  };

  return (
    <main className="login-container">
      <div className="login-account">
        <div className="logo-contain">
          <img src={logo} alt="logo" />
          <p>
            don't have an account? <Link className=" text-green-400 font-extrabold font-sans">signup</Link>{" "}
          </p>
        </div>
        <div className="form-container">
          <div className="welcome-back">
            <h2>welcome back</h2>
            <p>login into your account</p>
            <div className="social-button">
              <GoogleOAuthButton />
              <GithubButton />
            </div>
          </div>
          <div className="link-container ">
            <hr className="line" />
            <p className="continue-text">or Continue with</p>
          </div>
          <form action="" className="loginform">
            <input type="text" placeholder="email or mobile" />
            <div className="password-input-container border-2 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="password-input w-full"
              />
              {/* Toggle button to show/hide password */}
              {showPassword ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="link"><NavLink to={"/forgot-password"}>recover password</NavLink></div>
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
      <aside className="image-wrapper relative">
        <img src={login} alt="logo" />
        <div className="text-wrap font-roboto">
          <h4>
            Step into the realm of comfort and convenience, where every login
            opens the door to your dream rental house <br /> Your journey
            begins here, where finding your ideal rental home is just a click
            away.
          </h4>
        </div>
      </aside>
    </main>
  );
}

export default LoginPage;
