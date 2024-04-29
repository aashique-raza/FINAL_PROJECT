import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.png";
import { FaUser, FaBars, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import Profile from "./Profile";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [profile, SetShowProfile] = useState(false);
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const handleMenubar = () => {
    // alert(showMenu)
    setShowMenu(!showMenu);
  };
  const handleToggleProfile = () => {
    SetShowProfile(!profile);
  };

  return (
    <header className=" fixed top-0">
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
        </ul>
      </nav>

      <div className="menubar">
        {user ? (
          <button
            color="gray"
            className="profile-button  relative"
            onClick={ handleToggleProfile }
          >
            <img src={user.profileImage} alt="profileImage" />
            <span className=" font-raleway "> hi,{user.firstName}</span>
            {SetShowProfile && <Profile toggle={profile} />}
          </button>
        ) : (
          <NavLink className={"loginlink"} to={"/login"}>
            <FaUser /> log in
          </NavLink>
        )}

        <NavLink to={"/create-listing"} className={"create-listing"}>
          <FaPlus></FaPlus> create listing
        </NavLink>
        <button className={`bar `} onClick={handleMenubar}>
          <FaBars></FaBars>
        </button>
      </div>
    </header>
  );
}

export default Header;
