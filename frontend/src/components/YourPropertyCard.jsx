import React from "react";
import "../styles/YourProperty.css";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { LuIndianRupee } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

function YourPropertyCard({ property }) {
  return (
    <div className="your-property-card shadow-xl hover:shadow-2xl transition-all duration-100 ease-in">
      <div className="flex justify-end items-center">
        <button className="py-3 px-6 sm:py-4   lg:px-13 capitalize text-sm sm:text-xl lg:text-2xl tracking-wider text-slate-700 bg-gray-100">
          inactive
        </button>
      </div>
      <div className=" mt-4">
        {property.BHKType && (
          <NavLink
            to={`/property/rental/${property._id}`}
            className=" hover:text-red-600 hover:underline transition-all ease-in-out duration-150 font-bold flex-shrink flex justify-start items-center gap-1 text-slate-800 bg-transparent capitalize text-xl  lg:text-2xl  font-roboto font"
          >
            {property.BHKType === "1bhk" && "1 "}
            {property.BHKType === "2bhk" && "2 "}
            {property.BHKType === "3bhk" && "3 "}
            {property.BHKType === "4bhk" && "4 "}
            {property.BHKType === "4bhk+" && "4+ "}{" "}
            {property.BHKType === "1rk" ? "1 RK " : " BHK "}{" "}
            {property.apartmentType === "apartment" ? "flat" : "house"} for rent
            in
            {property.location.city}
            <span>
              {" "}
              <LuArrowUpRightSquare className=" inline-block" />{" "}
            </span>
          </NavLink>
        )}
        {property.roomSharing && (
          <NavLink
            to={`/property/pg/${property._id}`}
            className="hover:text-red-600 hover:underline transition-all ease-in-out duration-150 font-bold flex-shrink flex justify-start items-center gap-1 text-slate-800 bg-transparent capitalize text-xl  lg:text-2xl xl:text-3xl font-roboto font"
          >
            {property.roomSharing} room sharing in {property.pgOrHostelName}, in{" "}
            {property.location.city}
            <span>
              {" "}
              <LuArrowUpRightSquare className=" inline-block" />{" "}
            </span>
          </NavLink>
        )}

        <p className=" capitalize my-2 text-sm sm:text-xl  font-sans  font-bold text-gray-600">
          {property.location.localAddress} <span>{property.location.city}</span>{" "}
        </p>
      </div>
      <div className=" my-8 flex items-center lg:gap-12 md:gap-9  gap-6">
        <p className=" capitalize flex items-center gap-3 font-sans tracking-wide font-semibold">
          rent{" "}
          <span className=" font-extrabold">
            {" "}
            <LuIndianRupee className=" inline-block" />
            {property.rentAmount}/m
          </span>{" "}
        </p>
        <h4 className=" capitalize tracking-wider font-semibold font-roboto">
          {property.location.city}
        </h4>
      </div>
      <div className=" flex justify-between items-center mb-10">
        <NavLink to={`/edit-property/${property.roomSharing?'pg':"rental"}/${property._id}`} className="  tracking-wider flex justify-center items-start gap-1 lowercase  font-raleway text-xl sm:text-2xl px-5 py-3 bg-gray-200 text-teal-800 ">
          {" "}
          edit <MdEdit className=" inline-block text-green-700   mt-1" />{" "}
        </NavLink>
        <button className=" tracking-wider flex justify-center items-start gap-1 lowercase  font-raleway text-xl sm:text-2xl px-5 py-3 bg-gray-200 text-teal-800 ">
          {" "}
          delete <MdDelete className=" inline-block  text-red-500   mt-1" />{" "}
        </button>
      </div>
      <div className=" flex justify-start items-start px-3 w-full">
        <h3 className=" font-bold w-full border-t-2 capitalize text-xl sm:text-xl lg:text-2xl  font-serif tracking-wider py-4 sm:py-6 md:py-9 lg:py-14  ">
          0 contated
        </h3>
      </div>
    </div>
  );
}

export default YourPropertyCard;
