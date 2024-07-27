import React, { useState, useRef, useEffect } from "react";
import "../styles/Signup.css";
import img from "../assets/signup.jpeg";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, } from "react-icons/fa";
import {  Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import API_BASE_URL from "../configue";
import { API_URL } from "../configue";
import GoogleOAuthButton from "../components/GoogleOAuthButton";

function SignupPage({showSuccessMessage}) {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // store form data-----
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    let input = e.target.value;

    // Remove non-numeric characters
    input = input.replace(/\D/g, '');

    // Limit to 10 digits
    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    // Update state
    setFormData({
      ...formData,
      phoneNumber:input
    });
  };

// password vivibility function-------
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state to show/hide password
  };

  // handle change---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData)

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  // submit form here --------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation here number and password and confirm password
    if (!(formData.phoneNumber?.length === 10)) {
      return setError("Mobile number must be 10 digits");
    }

    if (
      formData.password.trim().toLocaleLowerCase() !==
      formData.confirmPassword.trim().toLocaleLowerCase()
    ) {
      return setError("password does not match with confirm password");
    }
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/create-account`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        credentials: "include",
      });
      // console.log(response);

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      showSuccessMessage("signup successfully!");
      navigate("/login");
    } catch (error) {
      setError('create account failed');
      setLoading(false);
      console.log(`signup failed ${error}`);
    }
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
          <h2 className="text ">create your account and list your porperty</h2>
        </div>
      </aside>
      <div className="formContainer ">
        <p className=" mr-5 mt-5  self-end text-xl   font-sans">
          {" "}
          have an account?{" "}
          <Link
            to={"/login"}
            className=" text-red-500 font-raleway text-xl font-bold"
          >
            login
          </Link>{" "}
        </p>
        <div className="formBox">
          <div className="slogan">
            <h2 className=" text-center ">Your Dream Space Awaits</h2>
            <p className=" text-center">getting started is easy</p>
            <div className="social-icons  flex justify-center gap-2 my-5 mb-10 ">
              <GoogleOAuthButton showSuccessMessage={showSuccessMessage} className='google icon'/>

            </div>
          </div>
          <div className="link-container ">
            <hr className="line" />
            <p className="continue-text">Continue with</p>
          </div>
          <div className="formcontrol   ">
            <form className="form  font-serif  " onSubmit={handleSubmit}>
              <input
                type="text "
                name="firstName"
                placeholder="first name"
                required
                onChange={handleChange}
                value={formData.firstName}
                className=" focus:ring-0 focus:border-none focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                required
                onChange={handleChange}
                value={formData.lastName}
                className=" focus:ring-0 focus:border-none focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                onChange={handleChange}
                value={formData.email}
                className=" focus:ring-0 focus:border-none focus:outline-none"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="mobile"
                required
                onChange={handleMobileChange}
                value={formData.phoneNumber}
                min={0}
                className=" focus:ring-0 focus:border-none focus:outline-none"
              />
              <div className="password-input-container border-2 ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="password-input w-full focus:ring-0 focus:border-none focus:outline-none"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  required
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
                  className="password-input w-full focus:ring-0 focus:border-none focus:outline-none"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  required
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

              <button type="submit">
                {loading ? (
                  <>
                    <Spinner
                      color="success"
                      aria-label="Failure spinner example"
                    />{" "}
                    creating...
                  </>
                ) : (
                  "create account"
                )}{" "}
              </button>
            </form>
          </div>
          {!passwordMatch && (
            <p
              style={{
                color: "red",
                marginTop: "-14px",
                marginBottom: "-12px",
                textAlign: "center",
              }}
            >
              Passwords are not matched!
            </p>
          )}
          {error && (
            <div className=" w-full flex justify-center items-center">
              <Alert
                className=" w-full sm:w-1/2 md:w-1/3 text-xl"
                color="failure"
                onDismiss={() => setError(null)}
              >
                {error}
              </Alert>
            </div>
          )}
        </div>
      </div>
      
    </main>
  );
}

export default SignupPage;
