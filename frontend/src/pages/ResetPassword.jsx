import React, { useState, useRef, useEffect } from "react";
import "../styles/Login.css";
import login from "../assets/login.jpeg";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

import { Alert, Spinner } from "flowbite-react";
import { useParams, useNavigate,  } from "react-router-dom";

function ResetPassword() {
  const [id, setId] = useState("");
  const [reset, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    // URL se query parameters ko extract karna
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    const resetToken = urlParams.get("reset");
    setResetToken(resetToken);
    setId(userId);
  }, []);




  const navigate = useNavigate();

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state to show/hide password
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);

      const response = await fetch(
        `/api/auth/reset-password?id=${id}&&reset=${reset}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      // console.log(response)
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccessMsg("password successfully recovered.");
      setTimeout(() => {
        navigate('/login');
    }, 1000)
    } catch (error) {
      console.log("reset password request failed", error);
    }
  };



  return (
    <main className="login-container">
      <div className="login-account">
        <div className="logo-contain">
          <img src={logo} alt="logo" />
          <p>
            send request again to reset password?{" "}
            <Link
              to={"/forgot-password"}
              className=" text-green-400 font-extrabold font-sans"
            >
              click here
            </Link>{" "}
          </p>
        </div>
        <div className="form-container">
          <div className="welcome-back">
            <h2>set new password</h2>
            {/* <p>login into your account</p> */}
          </div>

          <form action="" className="loginform" onSubmit={handleSubmit}>
            <div className="password-input-cont border-2 ">
              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
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
            <div className="password-input-cont border-2 ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm password"
                className="password-input w-full"
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
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
                <Spinner color="success" aria-label="Failure spinner example" />
              ) : (
                "reset paassword"
              )}
            </button>

            <div>
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
            </div>
          </form>
          {error && (
            <Alert color="failure" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          )}
          {successMsg && (
            <Alert color="success" onDismiss={() => setSuccessMsg(null)}>
              {successMsg}
            </Alert>
          )}
        </div>
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

export default ResetPassword;
