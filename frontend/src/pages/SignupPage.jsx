import React, { useState, useRef, useEffect } from "react";
import "../styles/Signup.css";
import img from "../assets/signup.jpeg";
import logo from "../assets/logo.png";
import github from "../assets/github.png";
import google from "../assets/google.png";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Alert,Spinner  } from "flowbite-react";
import API_BASE_URL from "../configue";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    password:'',
    confirmPassword:'',
    email:'',
    phoneNumber:''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const firstNameRef = useRef(null); // Ref for the first name input field

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle state to show/hide password
  };

  const handleChange = (e) => {
    const{name,value}=e.target
    setFormData({
      ...formData,
      [name]:value
    })
  };

  // console.log(formData)


  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      setError(null)
      setLoading(true)

      const response=await fetch(`${API_BASE_URL}/auth/create-account`,{
        method:"POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json" // Set content type to JSON
        },
        
      })
      console.log(response)

      

      if(!response.ok){
        const result=await response.json()
      setError(result.message)
      setLoading(false)
      return

      }
      setError(null)
      setLoading(false)
      navigate('/login')
      
    } catch (error) {
      console.log(`signup failed ${error}`)
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
          <h2 className="text font-serif">
            Join our community and unlock the door to your new beginning.
          </h2>
        </div>
      </aside>
      <div className="formContainer ">
        <p className=" mr-5 mt-5  self-end text-sm  font-sans">
          {" "}
          have an account?{" "}
          <Link
            to={"/login"}
            className=" text-green-400 font-raleway font-bold"
          >
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
            <form className="form  font-serif  " onSubmit={handleSubmit}>
              <input
                type="text "
                name="firstName"
                placeholder="first name"
                required
                onChange={handleChange}
                value={formData.firstName}
              />
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                required
                onChange={handleChange}
                value={formData.lastName}
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="number"
               
                name="phoneNumber"
                placeholder="mobile"
                required
                onChange={handleChange}
                value={formData.phoneNumber}
              />
              <div className="password-input-container border-2 ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="password-input w-full"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
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
               {
                loading ? (  <Spinner color="success" aria-label="Failure spinner example" />) : "create account"
               } </button>
            </form>
          
          </div>
            {!passwordMatch && (
                <p style={{ color: "red",marginTop:'-14px',marginBottom:'-12px',textAlign:'center' }}>Passwords are not matched!</p>
              )}
            {error && (
              <Alert color="failure" onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
