import React, { useState, useRef, useEffect } from "react";
import "../styles/Login.css";
import login from "../assets/login.jpeg";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  loginFailed,
  loginStart,
  clearError,
  
} from "../features/user.slice";
import API_BASE_URL from "../configue";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../configue";
import { setTokenInLocalStorage } from "../token";
import GoogleOAuthButton from "../components/GoogleOAuthButton";

function LoginPage({showSuccessMessage}) {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    dispatch(clearError())
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const { errorr, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state to show/hide password
  };

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if(!formData.email?.includes('@')){
   
      if (!(formData.email?.length === 10)) {
        return dispatch(loginFailed('Mobile number must be 10 digits'))
      }

      
    }
    
    try {
      dispatch(clearError());
      dispatch(loginStart());

      const response = await fetch(`${API_URL}/auth/login-account`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        credentials:'include'
      });
      // console.log(response)
      const result = await response.json();

      if (!response.ok) {
        // console.log(result)
        dispatch(loginFailed(result.message));
        return;
      }
      dispatch(clearError());
      dispatch(loginSuccess(result.user));
      setTokenInLocalStorage(result.token);
      showSuccessMessage('logged in successfull!')

      // setTokenInLocalStorage(token, cookieExpiry);

      navigate("/");
    } catch (error) {
      dispatch(loginFailed(error.message));
      console.log(`signup failed ${error}`);
    }
  };

  return (
    <main className="login-container">
      <div className="login-account">
        <div className="logo-contain">
          <img src={logo} alt="logo" />
          <p>
            don't have an account?{" "}
            <Link
              to={"/signup"}
              className=" text-red-500 font-extrabold "
            >
              signup
            </Link>{" "}
          </p>
        </div>
        <div className="form-container">
          <div className="welcome-back">
            <h2>welcome back</h2>
            <p>login into your account</p>
            <div className="social-button">
              <GoogleOAuthButton className="google icon" />
            </div>
          </div>
          <div className="link-container ">
            <hr className="line" />
            <p className="continue-text">or Continue with</p>
          </div>
          <form action="" className="loginform" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email or mobile"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className=" focus:ring-0 focus:outline-none focus:border-none"
            />
            <div className="password-input-cont border-2 ">
              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="password-input w-full focus:ring-0 focus:outline-none focus:border-none"
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
            <div className="link">
              <NavLink to={"/forgot-password"}>recover password</NavLink>
            </div>
            <button type="submit">
              {loading ? (
                <>
                <Spinner
                  color="success"
                  aria-label="Failure spinner example"
                />{" "}
                loging...
              </>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
        {errorr && (
          <div className=" w-full flex justify-center items-center">
          <Alert
            className=" w-full sm:w-1/2  text-xl"
            color="failure"
            onDismiss={() => dispatch(clearError(null))}
          >
            {errorr}
          </Alert>
        </div>
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

export default LoginPage;
