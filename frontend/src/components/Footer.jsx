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
import { allCities } from "../utils";

function Footer() {

    const links=[
       {
        url:'/',
        urlName:'home'
       },
       {
        url:'/about',
        urlName:'about'
       },
       {
        url:'/contact',
        urlName:'contact'
       },
       {
        url:'/create-listing',
        urlName:'list your property'
       },
       {
        url:'#',
        urlName:'blog'
       },
       
      
    ]

  return (
    <footer className=" footer-container">
      <section className="footer-sections footer-logo-section">
        <div className=" footer-logo-div">
          <img src={logoUrl} alt="logo" />
        </div>
        <p className=" block w-full mb-4  text-xl font-mono font-bold md:text-2xl xl:text-3xl">
          follow
        </p>
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
        <div className=" text-gray-600 capitalize text-sm  md:text-xl py-5  font-extrabold  font-raleway">
        ©2024-27 rental wave 
        </div>
      </section>
      <section className="footer-sections footer-links-section">
        <h1>links</h1>
        <div className=" text-white">
        {
            links?.map((url,idx)=>(
                <NavLink key={idx} to={url.url}>
                {url.urlName}
                </NavLink>
            ))
            
        }
        </div>
      </section>
      <section className="footer-sections footer-pg-section">
        <h1>PG</h1>
        <div>
          {allCities?.map((city,idx) => (
            <NavLink key={idx}>pg for rent in {city.label}</NavLink>
          ))}
        </div>
      </section>
      <section className="footer-sections footer-pg-section">
      <h1>Flat/Apartment</h1>
        <div>
          {allCities?.map((city,idx) => (
            <NavLink key={idx}>Flat for rent in {city.label}</NavLink>
          ))}
        </div>
      </section>
      
    </footer>
  );
}

export default Footer;
