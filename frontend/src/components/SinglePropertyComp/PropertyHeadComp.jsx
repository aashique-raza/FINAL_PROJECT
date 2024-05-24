import React from "react";
import "../../styles/SingleProperty.css";
import { IoHomeOutline } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";

function PropertyHeadComp() {
  return (
    <div className="property-section proeprty-section1">
      <div>
        <h2 className=" text-5xl text-gray-500 ">
         
          <IoHomeOutline  />
        </h2>
        <p>pg</p>
      </div>
      <div className=" border-b-2 border-gray-300 md:border-none">
        <h3>3 BHK Flat In Unitech Uniworld City For Rent In Sector-30</h3>
        <p>Sector-30, Gurgaon, Haryana, INDIA.</p>
      </div>
      <div>
        <h3 className=" flex items-center">
          <FaIndianRupeeSign /> <span>80,000/m</span>
        </h3>
        <p>rent</p>
      </div>
      <div>
        <h3>230</h3>
        <p>sqrft.</p>
      </div>
      <div>
        <h3 className=" flex items-center">
          {" "}
          <FaIndianRupeeSign /> <span> 80,000</span>
        </h3>
        <p>deposit</p>
      </div>
      
    </div>
  );
}

export default PropertyHeadComp;
