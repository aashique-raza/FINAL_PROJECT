import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.png";
import { FaUser, FaBars, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import Profile from "./Profile";
import { FaWindowClose } from "react-icons/fa";

import { isLoggedIn } from "../token";

function Header({showSuccessMessage}) {
 
  const loggedInStatus=isLoggedIn()
 
  const [showMenu, setShowMenu] = useState(false);
  const [profile, SetShowProfile] = useState(false);
  const profileButtonRef = useRef(null);
  const profileRef = useRef();
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const handleMenubar = () => {
    // alert(showMenu)
    setShowMenu(!showMenu);
  };
  const handleToggleProfile = () => {
    SetShowProfile(!profile);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        SetShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className=" fixed top-0 z-20">
      <div className="header-logo">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <nav className={`navbar ${showMenu ? "navbartoggle" : ""}`}>
        <ul className="itemlist font-raleway">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {" "}
            <Link to={"/rentals"}>Rentals</Link>{" "}
          </li>
          <li>
            <Link to={"/category"}>Categories</Link>{" "}
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className=" capitalize post-property">
            <Link to={'/create-listing'}>post property free</Link>
          </li>
        </ul>
        <FaWindowClose onClick={()=>setShowMenu(false)} className=" absolute top-2 left-2 text-4xl text-white font-bold"></FaWindowClose>
      </nav>

      <div className="menubar">
        {loggedInStatus ? (
         <div>
         <button
           color="gray"
           className="profile-button  relative"
           onClick={handleToggleProfile}
           ref={profileButtonRef}
         >
           <img src={user?.profileImage} alt="profileImage" />
           <span className=" font-raleway "> hi,{user?.firstName}</span>
           {profile && <Profile ref={profileRef} toggle={profile} showSuccessMessage={showSuccessMessage} />}
         </button>
         
       </div>
        ) : (
          <NavLink className={"loginlink"} to={"/login"}>
            <FaUser /> log in
          </NavLink>
        )}

        <NavLink to={"/create-listing"} className={"create-listing"}>
          <FaPlus></FaPlus> post property free
        </NavLink>
        <button className={`bar `} onClick={handleMenubar}>
          <FaBars></FaBars>
        </button>
      </div>
    </header>
  );
}

export default Header;
