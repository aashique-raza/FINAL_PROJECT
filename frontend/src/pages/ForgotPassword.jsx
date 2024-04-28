import React, { useState, useRef, useEffect } from "react";
import "../styles/Login.css";
import login from "../assets/login.jpeg";
import logo from "../assets/logo.png";

import { NavLink, Link } from "react-router-dom";

import { Alert, Spinner } from "flowbite-react";

import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorr, setError] = useState(null);
  const [successMsg, setSuccesMag] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`/api/auth/forgot-paasword`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      });
      // console.log(response)
      const result = await response.json();
      console.log(result)

      if (!response.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccesMag('reset link sent your email successfully.')
    } catch (error) {
      console.log("forgot password request failed", error.message);
    }
  };

//   console.log(formData);

  return (
    <main className="login-container">
      <div className="login-account">
        <div className="logo-contain">
          <img src={logo} alt="logo" />
          <p>
            don't have an account?{" "}
            <Link
              to={"/signup"}
              className=" text-green-400 font-extrabold font-sans"
            >
              signup
            </Link>{" "}
          </p>
        </div>
        <div className="form-container">
          <div className="welcome-back">
            <h2>recover your password here</h2>
            {/* <p>login into your account</p> */}
          </div>

          <form action="" className="loginform" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="enter valid email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />

            <button type="submit">
              {loading ? (
                <Spinner color="success" aria-label="Failure spinner example" />
              ) : (
                "continue"
              )}
            </button>
          </form>
        </div>
        {errorr && (
          <Alert color="failure" onDismiss={() => dispatch(clearError())}>
            {errorr}
          </Alert>
        )}

        {successMsg && (
          <Alert color="success" onDismiss={() => setSuccesMag(null)}>
            {successMsg}
          </Alert>
        )}
      </div>
      <aside className="image-wrapper relative">
        <img src={login} alt="logo" />
        <div className="text-wrap font-roboto">
          <h4>
            Step into the realm of comfort and convenience, where every login
            opens the door to your dream rental house <br /> Your journey begins
            here, where finding your ideal rental home is just a click away.
          </h4>
        </div>
      </aside>
    </main>
  );
}

export default ForgotPassword;
