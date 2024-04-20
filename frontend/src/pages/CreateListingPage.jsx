import React, { useState, useEffect } from "react";
import "../styles/CreateListing.css";
import { Link,Outlet } from "react-router-dom";
import {FaClipboardList,FaEye ,FaComments } from 'react-icons/fa'
import simpleListing from '../assets/simpleListing.jpg'
import tenetImg from '../assets/tenetImg.jpg'
import dealClosure from '../assets/dealClosure.jpg'
import {
  FaBed,
  FaImage,
  FaUtensils,
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
} from "react-icons/fa";
import PgRoom from "../components/PgRoom";
import HouseRoom from "../components/HouseRoom";
import FlatRoom from "../components/FlatRoom";
import { useLocation } from "react-router-dom";

function CreateListingPage() {
  const [residentialsActive, setResidentailActive] = useState(true);
  const [commercialActive, setCommercialActive] = useState(false);
  const [activeItemResdentialType, setActiveItemResdentialType] = useState("rent");
  const [activeItemCommercialType, setActiveItemCommercialType] = useState("for rent");
  

  return (
    <main className="create-listing-container">
      <div className="property-type-details">
        <div className="slogan">
          <h2 className=" font-raleway">Create Your Property Hassle-Free!</h2>
          <p className=" font-raleway">List with Ease, Rent with Peace</p>
        </div>
      </div>
      <div className="listing">
        <div className="all-options">
          <div className="res-comm">
            <h3>property type</h3>
            <div>
              <div className="residential-commercial">
                <button
                  className={`property-type  bd-1  ${
                    residentialsActive ? "selected" : ""
                  }`}
                  onClick={() => {
                    setCommercialActive(false);
                    setResidentailActive(true);
                  }}
                >
                  Residential
                </button>
                <button
                  className={`property-type bd-2  ${
                    commercialActive ? "selected " : ""
                  }`}
                  onClick={() => {
                    setResidentailActive(false);
                    setCommercialActive(true);
                  }}
                >
                  Commercial
                </button>
              </div>
            </div>
          </div>
          <div className="second-property-option">
            <h3>select property ad type</h3>
            <div className="option_items">
              {residentialsActive && (
                <>
                  <input
                    type="text"
                    value={"rent"}
                    readOnly
                    className={`item ${
                      activeItemResdentialType === "rent"
                        ? "bg-green-500 text-white"
                        : " bg-gray-200 text-black"
                    }`}
                    onClick={() => setActiveItemResdentialType("rent")}
                  />
                  <input
                    type="text"
                    value={"pg"}
                    readOnly
                    className={`item ${
                      activeItemResdentialType === "pg/hostel"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setActiveItemResdentialType("pg")}
                  />
                </>
              )}

              {commercialActive && (
                <>
                  <input
                    type="text"
                    value={"for rent"}
                    readOnly
                    className={`item ${
                      activeItemCommercialType === "for rent"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setActiveItemCommercialType("for rent")}
                  />
                  <input
                    type="text"
                    value={"for sale"}
                    readOnly
                    className={`item ${
                      activeItemCommercialType === "for sale"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => setActiveItemCommercialType("for sale")}
                  />
                </>
              )}
            </div>
          </div>
          <div className="property-select-link">
          <Link to={`/create-listing/${activeItemResdentialType}`}>start listing property for free</Link>
          
          </div>
       
        </div>
      </div>
      <div className="features">
                <div className="feature-items"> 
                    <h1 className=" font-raleway"><FaClipboardList/></h1>
                    <h3 className=" font-raleway">Easy Listing</h3>
                    <p className=" font-raleway"> Listing your property is effortless on our platform. Our user-friendly interface simplifies the process, allowing you to list your property quickly and hassle-free</p>
                </div>
                <div className="feature-items">
                    <h1 className=" font-raleway"><FaEye /></h1>
                    <h3 className=" font-raleway">Visibility & Reach </h3>
                    <p className=" font-raleway"> ain wider visibility for your property with us. Our extensive user base and effective marketing strategies ensure your property reaches a large audience, maximizing your chances of finding suitable tenants</p>
                </div>
                <div className="feature-items">
                    <h1 className=" font-raleway"><FaComments/></h1>
                    <h3 className=" font-raleway"> Transparent Communication </h3>
                    <p className=" font-raleway"> Communication is transparent on our platform. Manage conversations with tenants directly, ensuring clarity and reducing misunderstandings.</p>
                </div>
      </div>
      <section className="how-it-works">
        <h3 className="h3">how it works</h3>
        <div className="section-item">
          <div className="text-item">
            <h3>Simple Listing Process</h3>
            <p>As an owner you can list your property in a few minutes. Just fill out our super simple form. Your property will go live after verification.</p>
          </div>
          <div className="section-img">
            <img src={simpleListing} alt="simple listing img" />
          </div>
        </div>
        <div className="section-item">
          
          <div className="section-img middle"> 
            <img src={tenetImg} alt="tenet img" />
          </div>
          <div className="text-item">
            <h3>Tenant Selects Property and reach out to you</h3>
            <p>If a tenant likes your property they will request for your contact details. Both parties will receive contact information and then arrange for a visit.</p>
          </div>
        </div>
        <div className="section-item">
          <div className="text-item">
            <h3>Deal Closure</h3>
            <p>Owner and tenant meet to close the deal directly. NoBroker can help create a rental agreement and deliver it to your doorstep.</p>
          </div>
          <div className="section-img">
            <img src={dealClosure} alt="deal closure img" />
          </div>
        </div>

      </section>
    </main>
  );
}

export default CreateListingPage;
