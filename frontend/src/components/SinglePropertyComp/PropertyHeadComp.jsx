import React from "react";
import "../../styles/SingleProperty.css";
import { IoHomeOutline } from "react-icons/io5";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function PropertyHeadComp({
  rent = 500,
  deposit = 300,
  sqrfit = 230,
  name = "",
  location = "",
  bhktype=1,
  propertyAvailableFor='rent',
  apartment_name='royal',
  sharing='',
  tenet='boys'
}) {
  const { category, id } = useParams();

  // console.log("header-cmop", category);
  return (
    <div className="property-section proeprty-section1">
      <div className=" border-2 bg-gray-700  border-gray-700 text-white">
        <h2 className=" text-5xl text-white ">
          <IoHomeOutline />
        </h2>
        <p className="text-white ">{category}</p>
      </div>
      <div className="  bg-gray-700 text-white">
        {category.trim().toLocaleLowerCase() ===
        "rental".trim().toLocaleLowerCase() ? (
          <h3>{bhktype} BHK Flat In {apartment_name} For {propertyAvailableFor} In {location.localAddress}</h3>
        ) : (
          <h3 className=" text-white"> pg for {tenet} in {location.name},in {location.localAddress}  </h3>
        )}

        <p>{location.localAddress},{location.city}</p>
      </div>
      <div className=" b bg-gray-700">
        <h3 className=" flex items-center">
          <FaIndianRupeeSign /> <span>{rent}/m</span>
        </h3>
        <p>rent</p>
      </div>
      {category.trim().toLocaleLowerCase() ===
        "rental".trim().toLocaleLowerCase() && (
        <div className="  bg-gray-700">
          <h3>{sqrfit}</h3>
          <p>sqrft.</p>
        </div>
      )}

      <div className="  bg-gray-700">
        <h3 className=" flex items-center">
          {" "}
          <FaIndianRupeeSign /> <span> {deposit}</span>
        </h3>
        <p>deposit</p>
      </div>
    </div>
  );
}

export default PropertyHeadComp;
