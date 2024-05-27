import React from "react";
import { NavLink } from "react-router-dom";
import { LuIndianRupee } from "react-icons/lu";

function PropertySimillarComp() {
  return (
    <NavLink
      to="#" // Update this to the actual route you want to navigate to
      className="property-simillar-box flex items-center w-full bg-white border-2 border-gray-800 shadow-lg transition transform duration-300 hover:shadow-2xl hover:scale-95"
    >
      <div className="w-80 h-60 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3754595/pexels-photo-3754595.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="img"
          className="w-full h-full object-fill"
        />
      </div>
      <div className="px-3 flex-1 h-60 flex flex-col items-start">
        <h2 className="my-2 text-xl sm:text-2xl font-medium text-slate-800 capitalize tracking-wide font-roboto">
          3 BHK House For Rent In Sector 57
        </h2>
        <p className="capitalize font-serif font-thin text-sm sm:text-xl text-gray-400">
          Independent House, Sushant Lok III, Near SDM office
        </p>
        <div className="flex items-center justify-around gap-12 mt-20">
          <p className=" text-gray-900 flex flex-col items-start justify-start capitalize font-slab text-sm sm:text-xl">
            rent
            <span className="flex items-center">
              <LuIndianRupee size={"16px"} className="inline-block" />
              50,000
            </span>
          </p>
          <p className=" text-gray-900 flex flex-col items-start justify-start capitalize font-slab text-sm sm:text-xl">
            area <span> 500 sqrft. </span>
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default PropertySimillarComp;
