import React, { useState,useRef,useEffect } from "react";
import "../styles/Signup.css";
import img from "../assets/signup.jpeg";
import logo from "../assets/logo.png";
import github from "../assets/github.png";
import google from "../assets/google.png";
import { FaEye, FaEyeSlash,FaStar } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const firstNameRef = useRef(null); // Ref for the first name input field



  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state to show/hide password
  };

  return (
    <main className="signup ">
      <aside className="imageContainer relative ">
        <img src={img} alt="img" className="img h-full w-full object-fill" />
        <img
          src={logo}
          className=" w-12 h-12 rounded-full absolute  top-4 left-9"
          alt=""
        />
        <div className="text-container">
          <h2 className="text font-serif">
            Join our community and unlock the door to your new beginning.
          </h2>
        </div>
      </aside>
      <div className="formContainer ">
        <p className=" mr-5 mt-5  self-end text-sm  font-sans">
          {" "}
          have an account?{" "}
          <Link className=" text-green-400 font-raleway font-bold">
            login
          </Link>{" "}
        </p>
        <div className="formBox">
          <div className="slogan">
            <h2 className=" text-center text-2xl m-0 font-sans font-bold capitalize text-gray-800">
              Your Dream Space Awaits
            </h2>
            <p className="text-center font-slab lowercase text-xxl font-normal -mt-1">
              getting started is easy
            </p>
            <div className="social-icons font-raleway flex justify-center gap-2 my-5 mb-10 ">
              <button className="google icon">
                <img src={google} alt="github" />
                <p>google</p>
              </button>
              <button className="facebook icon">
                <img src={github} alt="github" />
                <p>github</p>
              </button>
            </div>
          </div>
          <div className="link-container ">
            <hr className="line" />
            <p className="continue-text">Continue with</p>
          </div>
          <div className="formcontrol   ">
            <form action="" className="form  font-serif  ">
             <input type="text " placeholder="first name" required />
              <input type="text" placeholder="last Name" required />
              <input type="email" placeholder="email" required />
              <input type="tel" placeholder="mobile" required />
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
              <div className="password-input-container border-2 ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  className="password-input w-full"
                />
                {/* Toggle button to show/hide password */}
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="eye-icon"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="eye-icon"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                )}
              </div>

              <button type="submit">create account</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
