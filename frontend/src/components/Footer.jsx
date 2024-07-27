import React from "react";
import logoUrl from "../assets/finalLogo.png";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { NavLink ,Link} from "react-router-dom";
import "../styles/Footer.css";
import { allCities } from "../utils";
import { useSelector } from "react-redux";

function Footer() {
  const{user}=useSelector((state)=>state.user)

  // navigate(`/search/${selectedOption}?q=${searchBHK}&&l=${searchLocation}`);

  const links = [
    {
      url: '/',
      urlName: 'home'
    },
    {
      url: '/about',
      urlName: 'about'
    },
    {
      url: '/contact',
      urlName: 'contact'
    },
    user && {
      url: '/create-listing',
      urlName: 'list your property'
    },
    {
      url: '#',
      urlName: 'blog'
    },
  ].filter(Boolean); // This will filter out any falsey values (like `false` or `null`)
  

    const pgRoomSharing = [
     
      { label: "single", value: "single" },
      { label: "double", value: "double" },
      { label: "three", value: "three" },
      { label: "four", value: "four" },
    ];
    const bhkTypes = [
      // {label:'select BHK type',value:""},
      { label: "1 RK", value: "1rk" },
      { label: "1 BHK", value: "1bhk" },
      { label: "2 BHK", value: "2bhk" },
      { label: "3 BHK", value: "3bhkk" },
      { label: "4 BHK", value: "4bhk" },
      { label: "4+ BHK", value: "4bhk+" },
    ];
    const findSharing = (index) => {
      // Ensure the index is within bounds
      if (index >= 0 && index < pgRoomSharing.length) {
        return pgRoomSharing[index].value;
      }
      // Return a default value or handle out-of-bounds index
      return '';
    };

    const findBhk=(index)=>{
      // Ensure the index is within bounds
      if (index >= 0 && index < bhkTypes.length) {
        return bhkTypes[index].value;
      }
      // Return a default value or handle out-of-bounds index
      return '';

    }
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
                <Link key={idx} to={url.url}>
                {url.urlName}
                </Link>
            ))
            
        }
        </div>
      </section>
      <section className="footer-sections footer-pg-section">
        <h1>PG</h1>
        <div>
          {allCities?.map((city,idx) => (
            // /property-by-city/:city
            
            <NavLink to={`#`} key={idx}>pg for rent in {city.label}</NavLink>
          ))}
        </div>
      </section>
      <section className="footer-sections footer-pg-section">
      <h1>Flat/Apartment</h1>
        <div>
          {allCities?.map((city,idx) => (
            <NavLink to={`#`} key={idx}>Flat for rent in {city.label}</NavLink>
          ))}
        </div>
      </section>
      
    </footer>
  );
}

export default Footer;
