import React from "react";
import { NavLink } from "react-router-dom";
import { LuIndianRupee } from "react-icons/lu";

function PropertySimillarComp() {
  return (
    <NavLink
      to="#" // Update this to the actual route you want to navigate to
      className="   property-simillar-box flex items-center w-full bg-white border-2 border-gray-800 shadow-lg transition transform duration-300 hover:shadow-2xl hover:scale-95"
    >
      <div className="  overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3754595/pexels-photo-3754595.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="img"
          className="w-full h-full object-fill"
        />
      </div>
      <div className=" duration-300  px-3 flex-1  flex flex-col items-start border-2">
        <h2 className=" hover:text-red-600  transition  ease-in-out my-2 text-xl sm:text-2xl font-medium text-slate-800 capitalize tracking-wide font-roboto">
          3 BHK House For Rent In Sector 57
        </h2>
        <p className="capitalize font-serif font-thin text-sm sm:text-xl text-gray-400">
          Independent House, Sushant Lok III, Near SDM office
        </p>
        <div className="flex items-center justify-around gap-12 mt-16">
          <p className="    text-gray-900 flex flex-col items-center justify-center gap-2 capitalize font-slab text-sm sm:text-xl">
            rent
            <span className="flex items-center font-bold">
              <LuIndianRupee size={"16px"} className="inline-block" />
              50,000
            </span>
          </p>
          {/* <p className="  text-gray-900 flex flex-col items-center justify-center gap-2 capitalize font-slab text-sm sm:text-xl">
            area <span className=" font-bold"> 500 sqrft. </span>
          </p> */}
          <p className=" text-gray-900 flex flex-col items-center justify-center gap-2 capitalize font-slab text-sm sm:text-xl">
            food avaibility <span className="  font-bold"> yes </span>
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default PropertySimillarComp;
