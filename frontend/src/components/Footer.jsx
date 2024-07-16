import React from "react";
import logoUrl from "../assets/finalLogo.png";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className=" footer-container">
      <section className="footer-sections footer-logo-section">
        <div className=" footer-logo-div">
          <img src={logoUrl} alt="logo" />
        </div>
        <p className=" block w-full mb-4  text-xl font-mono font-bold md:text-2xl xl:text-3xl">follow</p>
        <div className="footer-social-icons">
           
          <NavLink to="#">
            <FaFacebook className="fa-facebook" />
          </NavLink>
          <NavLink to="#">
            <FaInstagram className="fa-instagram" />
          </NavLink>
          <NavLink to="#">
            <FaYoutube className="fa-youtube" />
          </NavLink>
          <NavLink to="#">
            <FaTwitter className="fa-twitter" />
          </NavLink>
          <NavLink to="#">
            <FaLinkedin className="fa-linkedin" />
          </NavLink>
        </div>
      </section>
      <section className="footer-sections footer-pg-section"></section>
      <section className="footer-sections footer-rent-section"></section>
      <section className="footer-sections footer-links-section"></section>
    </footer>
  );
}

export default Footer;
